import type { AssignmentAnswer as PrismaAssignmentAnswer } from '@prisma/client'
import { interfaceType, objectType } from 'nexus'

export const assignment = objectType({
  name: 'Assignment',
  definition(t) {
    t.implements('Node')
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
      type: 'AssignmentSection',
    })
  },
})

export const assignmentState = objectType({
  name: 'AssignmentState',
  definition(t) {
    t.implements('Node')
    t.model.open()
    t.model.openedAt()
    t.model.closedAt()
  },
})

export const assignmentVariant = objectType({
  name: 'AssignmentVariant',
  definition(t) {
    t.implements('Node')
    t.model.name()
    t.model.assignmentQuestion({
      type: 'AssignmentQuestion',
      alias: 'questions',
    })
  },
})

export const assignmentSection = objectType({
  name: 'AssignmentSection',
  definition(t) {
    t.implements('Node')
    t.model.title()
    t.model.description()
  },
})

export const assignmentQuestion = objectType({
  name: 'AssignmentQuestion',
  definition(t) {
    t.implements('Node')
    t.model.type()
    t.model.score()
    t.field('content', {
      type: 'JSON',
    })
    t.model.answers({
      type: 'AssignmentAnswer',
    })
  },
})

export const assignmentAnswer = interfaceType({
  name: 'AssignmentAnswer',
  resolveType(question) {
    if ('text' in question) {
      return textQuestion.name
    }
    if ('number' in question) {
      return numberQuestion.name
    }
    if ('content' in question) {
      return choiceQuestion.name
    }
  },
  definition(t) {
    t.implements('Node')
    t.model.markedCorrect()
  },
})

export const textQuestion = objectType({
  name: 'TextQuestionAnswer',
  definition(t) {
    t.implements('AssignmentAnswer')
    t.string('text', {
      resolve: (parent: PrismaAssignmentAnswer) => parent.textContent,
    })
  },
})

export const numberQuestion = objectType({
  name: 'NumberQuestionAnswer',
  definition(t) {
    t.implements('AssignmentAnswer')
    t.float('number', {
      resolve: (parent: PrismaAssignmentAnswer) => parseFloat(parent.textContent),
    })
  },
})

export const choiceQuestion = objectType({
  name: 'ChoiceQuestionAnswer',
  definition(t) {
    t.implements('AssignmentAnswer')
    t.nonNull.field('content', {
      type: 'JSON',
    })
  },
})
