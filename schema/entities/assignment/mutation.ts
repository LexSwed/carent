import { AssignmentQuestion as PrismaAssignmentQuestion, AssignmentQuestionType } from '@prisma/client'
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
        const assignment = await prisma.assignment.create({
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
          select: {
            id: true,
            sections: {
              select: {
                id: true,
              },
            },
            variants: {
              select: {
                id: true,
              },
            },
          },
        })

        await prisma.assignmentQuestion.create({
          data: {
            type: AssignmentQuestionType.Text,
            content: null,
            assignmentSectionId: assignment.sections[0].id,
            variantId: assignment.variants[0].id,
            orderKey: LexoRank.middle().toString(),
          },
        })

        return prisma.assignment.findUnique({
          where: {
            id: assignment.id,
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
        console.error(error)
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
    resolve: (_, { id, section }, { prisma, session }) => {
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
      assignmentId: nonNull(
        idArg({
          description: 'ID of the assignment a question belongs to',
        })
      ),
      variantId: nonNull(
        idArg({
          description: 'ID of the variant a question belongs to',
        })
      ),
      type: nonNull('AssignmentQuestionType'),
    },
    authorize: (_, { assignmentId }, ctx) => canUpdateAssignment(assignmentId, ctx),
    resolve: async (_, { assignmentId, variantId, type }, { prisma }) => {
      try {
        const lastQuestion = await prisma.assignmentQuestion.findFirst({
          where: { assignmentSection: { assignmentId } },
          orderBy: { orderKey: 'asc' },
          select: { orderKey: true, assignmentSectionId: true },
        })

        if (lastQuestion) {
          return prisma.assignmentQuestion.create({
            data: {
              type,
              content: {},
              orderKey: LexoRank.parse(lastQuestion.orderKey).genPrev().toString(),
              variantId,
              assignmentSectionId: lastQuestion.assignmentSectionId,
            },
            include: {
              answers: true,
              correctAnswers: {
                include: {
                  answer: true,
                },
              },
            },
          })
        }

        const lastSection = await prisma.assignmentSection.findFirst({
          where: {
            assignmentId,
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
            type,
            orderKey,
            content: {},
            variantId,
            assignmentSectionId: lastSection.id,
          },
          include: {
            answers: true,
            correctAnswers: {
              include: {
                answer: true,
              },
            },
          },
        })
      } catch (error) {
        throw new ApolloError('Failed to create new assignment question', '400')
      }
    },
  })
})

export const updateQuestion = mutationField((t) => {
  t.field('updateAssignmentQuestion', {
    type: 'AssignmentQuestion',
    args: {
      assignmentId: nonNull(
        idArg({
          description: 'ID of the assignment a question belongs to',
        })
      ),
      questionSettings: nonNull(
        inputObjectType({
          name: 'UpdateAssignmentQuestionInput',
          definition(t) {
            t.field('type', {
              type: 'AssignmentQuestionType',
            })
          },
        })
      ),
    },
    authorize: (_, { assignmentId }, ctx) => canUpdateAssignment(assignmentId, ctx),
    resolve: () => {},
  })

  t.field('duplicateAssignmentQuestion', {
    type: 'AssignmentQuestion',
    args: {
      assignmentId: nonNull(
        idArg({
          description: 'ID of the assignment a question belongs to',
        })
      ),
      questionId: nonNull(
        idArg({
          description: 'ID of the question to duplicate',
        })
      ),
    },
    authorize: (_, { assignmentId }, ctx) => canUpdateAssignment(assignmentId, ctx),
    resolve: (_root, {}, {}) => {
      // const { type, content, variantId, assignmentSectionId, answers } = prisma.assignmentQuestion.findUnique({
      //   where: {
      //     id: questionId,
      //   },
      //   select: {
      //     type: true,
      //     content: true,
      //     variantId: true,
      //     assignmentSectionId: true,
      //     answers: {
      //       select: {
      //         value: true,
      //         hint: true,
      //         imageUrl: true,
      //         content: true,
      //       },
      //     },
      //   },
      // })
      // return prisma.assignmentQuestion.create({
      //   data: {
      //     type,
      //     content,
      //     variantId,
      //     assignmentSectionId,
      //     // answers: {
      //     //   create: answers
      //     // },
      //   },
      //   include: {
      //     answers: true,
      //   },
      // })
    },
  })
})

export const deleteQuestion = mutationField((t) => {
  t.field('deleteAssignmentQuestion', {
    type: 'AssignmentQuestion',
    args: {
      assignmentId: nonNull(
        idArg({
          description: 'ID of the assignment a question belongs to',
        })
      ),
      questionId: nonNull(
        idArg({
          description: 'ID of the question to delete',
        })
      ),
    },
    authorize: (_, { assignmentId }, ctx) => canUpdateAssignment(assignmentId, ctx),
    resolve: (_root, { questionId }, { prisma }) => {
      return prisma.assignmentQuestion.delete({
        where: {
          id: questionId,
        },
        include: {
          assignmentSection: {
            include: {
              questions: true,
            },
          },
          answers: true,
          correctAnswers: {
            include: {
              answer: true,
            },
          },
        },
      })
    },
  })
})

async function canUpdateAssignment(id: PrismaAssignmentQuestion['id'], { prisma, session }: Context) {
  const assignment = await prisma.assignment.findFirst({
    where: {
      id,
      creatorId: session.user.teacherId,
      archivedAt: {
        equals: null,
      },
    },
  })
  return !!assignment
}
