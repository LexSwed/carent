import type { AssignmentQuestion as PrismaAssignmentQuestion } from '@prisma/client'
import { interfaceType, objectType } from 'nexus'

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
      resolve: (parent: any) => {
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
