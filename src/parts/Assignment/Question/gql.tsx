import { useCallback } from 'react'
import { gql, Reference, useApolloClient } from '@apollo/client'
import type { AssignmentQuestionType } from '@prisma/client'

export const QuestionBlockFragment = gql`
  fragment QuestionBlockFragment on AssignmentQuestion {
    id
    content
    type
    score
    answers {
      ...QuestionBlockAnswerFragment
    }
  }

  fragment QuestionBlockAnswerFragment on AssignmentAnswer {
    id
    markedCorrect
    ... on TextQuestionAnswer {
      text
    }
    ... on NumberQuestionAnswer {
      number
    }
    ... on ChoiceQuestionAnswer {
      content
    }
  }
`

const updateTypeFragment = gql`
  fragment QuestionBlockTypeUpdateFragment on AssignmentQuestion {
    type
  }
`
export function useUpdateQuestionType(questionId: string) {
  const client = useApolloClient()

  return useCallback(
    (type: AssignmentQuestionType) => {
      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: 'AssignmentQuestion',
          id: questionId,
        }),
        fragment: updateTypeFragment,
        data: {
          type,
        },
      })
    },
    [client.cache, questionId]
  )
}

const updateScoreFragment = gql`
  fragment QuestionBlockScoreUpdateFragment on AssignmentQuestion {
    score
  }
`
export function useUpdateScore(questionId: string) {
  const client = useApolloClient()

  return useCallback(
    (score: number) => {
      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: 'AssignmentQuestion',
          id: questionId,
        }),
        fragment: updateScoreFragment,
        data: {
          score,
        },
      })
    },
    [client.cache, questionId]
  )
}

const QuestionBlockAnswersUpdateFragment = gql`
  fragment QuestionBlockAnswersUpdateFragment on AssignmentAnswer {
    id
    markedCorrect
    ... on TextQuestionAnswer {
      text
    }
    ... on NumberQuestionAnswer {
      number
    }
    ... on ChoiceQuestionAnswer {
      content
    }
  }
`
export function useUpdateAnswers(questionId: string) {
  const client = useApolloClient()

  return useCallback(
    (answers: QuestionBlockFragment['answers']) => {
      client.cache.modify({
        id: client.cache.identify({
          __typename: 'AssignmentQuestion',
          id: questionId,
        }),
        fields: {
          answers: () =>
            answers.reduce((all, answer) => {
              let data: QuestionBlockFragment['answers'][number]
              if ('content' in answer) {
                data = {
                  ...answer,
                  __typename: 'ChoiceQuestionAnswer',
                }
              } else if ('text' in answer) {
                data = {
                  ...answer,
                  __typename: 'TextQuestionAnswer',
                }
              } else if ('number' in answer) {
                data = {
                  ...answer,
                  __typename: 'NumberQuestionAnswer',
                }
              }
              if (data) {
                all.push(
                  client.cache.writeFragment({
                    data,
                    fragment: QuestionBlockAnswersUpdateFragment,
                  })
                )
              }
              return all
            }, [] as Reference[]),
        },
      })
    },
    [client.cache, questionId]
  )
}
