import React from 'react'

import type { AssignmentQuestionType } from '@prisma/client'
import QuestionCard from './QuestionContent'

import { gql } from '@apollo/client'

const Question = () => {
  const [type, setType] = React.useState<AssignmentQuestionType>('Text')
  return <QuestionCard />
}

Question.fragment = gql`
  fragment QuestionBlock on AssignmentQuestion {
    id
    content
    type
    correctAnswers {
      id
    }
    answers {
      ... on AssignmentAnswer {
        id
      }
      ... on TextQuestion {
        label
        hint
      }
      ... on NumberQuestion {
        label
        hint
      }
      ... on Choice {
        options {
          id
          content
        }
      }
    }
  }
`

export default Question
