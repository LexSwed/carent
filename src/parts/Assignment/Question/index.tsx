import React from 'react'

import type { AssignmentQuestionType } from '@prisma/client'

import { gql } from '@apollo/client'
import QuestionCard from './QuestionCard'

const Question = () => {
  const [type, setType] = React.useState<AssignmentQuestionType>('Text')
  return <QuestionCard type={type} onAdd={() => {}} onUpdate={() => {}} />
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
