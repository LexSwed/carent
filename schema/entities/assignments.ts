import type { AssignmentQuestion as PrismaAssignmentQuestion } from '@prisma/client'
import { idArg, interfaceType, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
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
    t.model.sections({
      type: 'AssignmentSection',
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

export const assignmentSection = objectType({
  name: 'AssignmentSection',
  definition(t) {
    t.implements('Node')
    t.model.id()
    t.model.title()
    t.model.description()
    t.nonNull.list.field('questions', {
      type: 'AssignmentQuestion',
    })
  },
})

export const assignmentQuestion = objectType({
  name: 'AssignmentQuestion',
  definition(t) {
    t.implements('Node')
    t.model.id()
    t.field('content', {
      type: 'JSON',
    })
    t.nonNull.list.field('correctAswers', {
      type: 'AssignmentQuestionCorrectAnswer',
    })
    t.nonNull.list.field('answer', {
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

export const questionTask = interfaceType({
  name: 'AssignmentAnswer',
  resolveType(question: PrismaAssignmentQuestion) {
    switch (question.type) {
      case 'Text':
        return textQuestion.name
      case 'Number':
        return numberQuestion.name
      case 'MultipleChoice':
        return multipleChoiceQuestion.name
      case 'SingleChoice':
        return singleChoiceQuestion.name
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
export const multipleChoiceQuestion = objectType({
  name: 'MultipleChoice',
  definition(t) {
    t.implements('AssignmentAnswer')
    t.nonNull.list.field('options', {
      type: assignmentAnswerOption,
    })
  },
})

export const singleChoiceQuestion = objectType({
  name: 'SingleChoice',
  definition(t) {
    t.implements('AssignmentAnswer')
    t.nonNull.list.field('options', {
      type: assignmentAnswerOption,
    })
  },
})
