import type {
  AssignmentQuestion as PrismaAssignmentQuestion,
  AssignmentSection as PrismaAssignmentSection,
} from '@prisma/client'
import { ApolloError } from 'apollo-server-micro'
import { LexoRank } from 'lexorank'
import { idArg, inputObjectType, interfaceType, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
import type { Context } from '../context'
import { relayToPrismaPagination } from '../utils'

export const getClassAssignments = queryField((t) => {
  t.connectionField('assignments', {
    type: 'Assignment',
    additionalArgs: {
      classId: nonNull(
        idArg({
          description: 'ID of the Class the assignments belong to',
        })
      ),
      topicId: idArg({
        description: 'ID of the Topic the assignments belong to',
      }),
    },
    nodes: (_root, { classId, topicId, ...args }, { prisma, session }) => {
      return prisma.assignment.findMany({
        ...relayToPrismaPagination(args),
        where: {
          creatorId: session?.user.teacherId,
          topicId: topicId,
          topic: {
            classId,
            archivedAt: {
              equals: null,
            },
          },
        },
      })
    },
  })

  t.field('assignment', {
    type: 'Assignment',
    args: {
      id: nonNull(
        idArg({
          description: 'ID of the assignment',
        })
      ),
    },
    resolve: (_root, { id }, { prisma, session }) => {
      return prisma.assignment.findUnique({
        where: {
          id_creatorId: {
            id,
            creatorId: session?.user.teacherId,
          },
        },
      })
    },
  })
})

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
    resolve: (_, { title, topicId }, { prisma, session }) => {
      return prisma.assignment.create({
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
      })
    },
  })

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
    resolve: (_root, { questionId, assignmentId }, { prisma }) => {
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

export const topicAssignment = objectType({
  name: 'Assignment',
  definition(t) {
    t.implements('Node')
    t.model.id()
    t.model.title()
    t.model.description({
      description: 'Assignment goals, things to cover, etc',
    })
    t.model.topic()
    t.model.state({
      type: 'AssignmentState',
    })
    t.model.variants({
      type: 'AssignmentVariant',
    })
    t.model.sections({
      type: 'AssignmentSection' as any,
    })
  },
})

export const assignmentState = objectType({
  name: 'AssignmentState',
  definition(t) {
    t.implements('Node')
    t.model.id()
    t.model.open()
    t.model.openedAt()
    t.model.closedAt()
  },
})

export const assignmentVariant = objectType({
  name: 'AssignmentVariant',
  definition(t) {
    t.implements('Node')
    t.model.id()
    t.model.name()
  },
})

export const assignmentSection = objectType({
  name: 'AssignmentSection',
  definition(t) {
    t.implements('Node')
    t.model.id()
    t.model.title()
    t.model.description()
    t.nonNull.list.field('questions', {
      type: 'AssignmentQuestion',
      resolve: (parent: PrismaAssignmentSection) => {
        return parent.questions ? parent.questions : []
      },
    })
  },
})

export const assignmentQuestion = objectType({
  name: 'AssignmentQuestion',
  definition(t) {
    t.implements('Node')
    t.model.id()
    t.model.type()
    t.model.score()
    t.field('content', {
      type: 'JSON',
    })
    t.nonNull.list.field('correctAnswers', {
      type: 'AssignmentQuestionCorrectAnswer',
    })
    t.nonNull.list.field('answers', {
      type: 'AssignmentAnswer',
    })
  },
})

export const questionCorrectAnswer = objectType({
  name: 'AssignmentQuestionCorrectAnswer',
  definition(t) {
    t.implements('Node')
    t.model.id()
    t.nonNull.field('answer', {
      type: 'AssignmentAnswer',
    })
  },
})

export const assignmentAnswer = interfaceType({
  name: 'AssignmentAnswer',
  resolveType(question: PrismaAssignmentQuestion) {
    switch (question.type) {
      case 'Text':
        return textQuestion.name
      case 'Number':
        return numberQuestion.name
      case 'Choice':
        return choiceQuestion.name
      default:
        throw new Error('Question block is not defined')
    }
  },
  definition(t) {
    t.id('id')
  },
})

export const textQuestion = objectType({
  name: 'TextQuestion',
  definition(t) {
    t.implements('AssignmentAnswer')
    t.string('label')
    t.string('hint')
  },
})

export const numberQuestion = objectType({
  name: 'NumberQuestion',
  definition(t) {
    t.implements('AssignmentAnswer')
    t.string('label')
    t.string('hint')
  },
})

export const assignmentAnswerOption = objectType({
  name: 'AssignmentAnswerOption',
  definition(t) {
    t.implements('Node')
    t.model.id()
    t.nonNull.field('content', {
      type: 'JSON',
    })
  },
})

export const choiceQuestion = objectType({
  name: 'Choice',
  definition(t) {
    t.implements('AssignmentAnswer')
    t.nonNull.list.field('options', {
      type: 'AssignmentAnswerOption',
    })
  },
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
