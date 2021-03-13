import type { AssignmentQuestion as PrismaAssignmentQuestion, Assignment as PrismaAssignment } from '@prisma/client'
import { ApolloError } from 'apollo-server-micro'
import { LexoRank } from 'lexorank'
import { idArg, inputObjectType, mutationField, nonNull, objectType, stringArg } from 'nexus'
import type { Context } from '../../context'

export const createAssignment = mutationField((t) => {
  t.field('createAssignment', {
    type: 'Assignment',
    args: {
      title: nonNull(
        stringArg({
          description: 'Title of the assignment, e.g. "Home test" or "Control assignment"',
        })
      ),
      topicId: nonNull(
        idArg({
          description: 'ID of the topic the assignment belongs to',
        })
      ),
    },
    resolve: async (_, { title, topicId }, { prisma, session }) => {
      try {
        return prisma.assignment.create({
          data: {
            title,
            state: {
              create: {},
            },
            sections: {
              create: {
                title: 'Section 1',
              },
            },
            variants: {
              create: {
                name: 'Variant',
              },
            },
            creatorId: session?.user.teacherId,
            topic: {
              connect: {
                id_teacherId: {
                  id: topicId,
                  teacherId: session?.user.teacherId,
                },
              },
            },
          },
          include: {
            sections: {
              include: {
                questions: true,
              },
            },
            variants: true,
          },
        })
      } catch (error) {
        throw new ApolloError('Failed to create new assignment', '400')
      }
    },
  })
})

export const archiveAssignment = mutationField((t) => {
  t.field('archiveAssignment', {
    description: 'Archive assignment. Returns ID of the assignment',
    type: objectType({
      name: 'ArchivedAssignment',
      description: 'Partial response of archived assignment',
      definition(t) {
        t.id('id')
      },
    }),
    args: {
      id: nonNull(
        idArg({
          description: 'ID of the assignment to delete',
        })
      ),
    },
    resolve: (_, { id }, { prisma, session }) => {
      try {
        return prisma.assignment.update({
          where: {
            id_creatorId: {
              id,
              creatorId: session?.user?.teacherId,
            },
          },
          data: {
            archivedAt: new Date(),
          },
          select: {
            id: true,
          },
        })
      } catch (error) {
        throw new ApolloError('Failed to archive the assignment', '400')
      }
    },
  })
})

export const updateAssignmentSection = mutationField((t) => {
  t.field('updateAssignmentSection', {
    type: 'AssignmentSection',
    args: {
      id: nonNull(
        idArg({
          description: 'ID of the section to update',
        })
      ),
      section: nonNull(
        inputObjectType({
          name: 'AssignmentSectionUpdateInput',
          definition(t) {
            t.string('title', { description: 'A new title for the section' })
            t.string('description', { description: 'A new description for the section' })
          },
        })
      ),
    },
    authorize: (_, { id }, { prisma, session }) => {
      const item = prisma.assignmentSection.findFirst({
        where: {
          id,
          AND: {
            assignment: {
              creatorId: session?.user.teacherId,
              archivedAt: {
                equals: null,
              },
            },
          },
        },
        select: {
          id: true,
        },
      })

      return !!item
    },
    resolve: (_, { id, section }, { prisma }) => {
      return prisma.assignmentSection.update({
        where: {
          id,
        },
        data: {
          title: section.title ?? undefined,
          description: section.description ?? undefined,
        },
      })
    },
  })
})

export const addQuestion = mutationField((t) => {
  t.field('addAssignmentQuestion', {
    type: 'AssignmentQuestion',
    args: {
      assignment: inputObjectType({
        name: 'AddAssignmentQuestionInput',
        description: 'Assignment info required to add a new question if `afterQuestionId` is not provided',
        definition(t) {
          t.nonNull.id('assignmentId', {
            description: 'ID of the assignment a new question belongs to',
          })
          t.nonNull.id('variantId', {
            description:
              'ID of the assignment variant add a new question to. Has to be specified if `afterQuestionId` is not provided',
          })
        },
      }),
      afterQuestionId: idArg({
        description: 'ID of the question next to which the new one will be created',
      }),
    },
    authorize: (_, { assignment, afterQuestionId }, ctx) =>
      canUpdateAssignment({ questionId: afterQuestionId, assignmentId: assignment?.assignmentId }, ctx),
    resolve: async (_, { assignment, afterQuestionId }, { prisma }) => {
      if (afterQuestionId) {
        try {
          const afterQuestion = await prisma.assignmentQuestion.findUnique({
            where: { id: afterQuestionId },
            select: { orderKey: true, assignmentSectionId: true, variantId: true },
          })
          return prisma.assignmentQuestion.create({
            data: {
              type: 'Text',
              content: {},
              orderKey: LexoRank.parse(afterQuestion.orderKey).genPrev().toString(),
              variantId: afterQuestion.variantId,
              assignmentSectionId: afterQuestion.assignmentSectionId,
            },
            include: {
              answers: true,
            },
          })
        } catch (err) {
          throw new ApolloError('Failed to create new assignment question', '400')
        }
      }
      if (assignment?.assignmentId && assignment?.variantId) {
        const lastSection = await prisma.assignmentSection.findFirst({
          where: {
            assignmentId: assignment.assignmentId,
          },
          orderBy: {
            createdAt: 'asc',
          },
          select: {
            id: true,
          },
        })
        const orderKey = LexoRank.middle().toString()

        return prisma.assignmentQuestion.create({
          data: {
            type: 'Text',
            orderKey,
            content: {},
            variantId: assignment.variantId,
            assignmentSectionId: lastSection.id,
          },
          include: {
            answers: true,
          },
        })
      }

      throw new ApolloError('Either `afterQuestionId` or `variantId` has to be provided', '400')
    },
  })
})

export const updateQuestion = mutationField((t) => {
  t.field('updateAssignmentQuestion', {
    type: 'AssignmentQuestion',
    args: {
      questionId: nonNull(
        idArg({
          description: 'ID of the question to update',
        })
      ),
      input: nonNull(
        inputObjectType({
          name: 'UpdateAssignmentQuestionInput',
          definition(t) {
            t.field('type', {
              type: 'AssignmentQuestionType',
            })
            t.int('score')
          },
        })
      ),
    },
    authorize: (_, { questionId }, ctx) => canUpdateAssignment({ questionId }, ctx),
    resolve: (_, { questionId, input }) => {
      return {} as any
    },
  })
})

export const duplicateQuestion = mutationField((t) => {
  t.field('duplicateAssignmentQuestion', {
    type: 'AssignmentQuestion',
    args: {
      questionId: nonNull(
        idArg({
          description: 'ID of the question to duplicate',
        })
      ),
    },
    authorize: (_, { questionId }, ctx) => canUpdateAssignment({ questionId }, ctx),
    resolve: (_root, {}, {}) => {
      return {} as any
    },
  })
})

export const deleteQuestion = mutationField((t) => {
  t.field('deleteAssignmentQuestion', {
    type: objectType({
      name: 'DeleteAssignmentQuestionResult',
      definition(t) {
        t.nonNull.id('id')
      },
    }),
    args: {
      questionId: nonNull(
        idArg({
          description: 'ID of the question to delete',
        })
      ),
    },
    authorize: (_, { questionId }, ctx) => canUpdateAssignment({ questionId }, ctx),
    resolve: async (_root, { questionId }, { prisma }) => {
      const res = await prisma.assignmentQuestion.delete({
        where: {
          id: questionId,
        },
        select: {
          id: true,
        },
      })

      return res
    },
  })
})

type Params = {
  questionId?: PrismaAssignmentQuestion['id']
  assignmentId?: PrismaAssignment['id']
}
async function canUpdateAssignment(
  { questionId, assignmentId }: Params,
  { prisma, session }: Context
): Promise<boolean> {
  if (questionId) {
    const question = await prisma.assignmentQuestion.findFirst({
      where: {
        id: questionId,
        assignmentSection: {
          assignment: {
            creatorId: session.user.teacherId,
            archivedAt: {
              equals: null,
            },
          },
        },
      },
      select: {
        id: true,
      },
    })
    console.log(question)
    return !!question
  } else if (assignmentId) {
    const assignment = await prisma.assignment.findFirst({
      where: {
        id: assignmentId,
        creatorId: session.user.teacherId,
        archivedAt: {
          equals: null,
        },
      },
    })
    return !!assignment
  }

  return false
}
