import type { AssignmentQuestion as PrismaAssignmentQuestion } from '@prisma/client'
import { ApolloError } from 'apollo-server-micro'
import { LexoRank } from 'lexorank'
import { idArg, inputObjectType, mutationField, nonNull, stringArg } from 'nexus'
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
                title: 'main',
              },
            },
            variants: {
              create: {
                name: 'main',
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
            content: {},
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
        throw new ApolloError('Failed to create new assignment', '400')
      }
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
      })
    },
  })
})

async function canUpdateAssignment(id: PrismaAssignmentQuestion['id'], { prisma, session }: Context) {
  const topic = await prisma.assignment.findUnique({
    where: {
      id_creatorId: {
        id,
        creatorId: session.user.teacherId,
      },
    },
  })
  return !!topic
}
