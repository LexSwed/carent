import React from 'react'
import { Button, Flex, Grid, Icon } from '@fxtrot/ui'

import { AssignmentQuestionType } from '@prisma/client'
import { HiOutlineMenuAlt4, HiOutlinePlus } from 'react-icons/hi'

import QuestionSettings from './Settings'

import TextContent from './types/Text'
import NumberContent from './types/Number'
import { gql } from '@apollo/client'

const content = {
  [AssignmentQuestionType.Text]: TextContent,
  [AssignmentQuestionType.Number]: NumberContent,
}

type Props = GetAssignmentDetailsQuery['assignment']['sections'][number]['questions'][number]

const Question = ({ id, type }: Props) => {
  const Content = content[type]

  return (
    <Grid columns="auto 1fr" gap="$2" css={{ alignItems: 'center' }}>
      <Flex flow="row" space="$1">
        <Button variant="flat" size="sm">
          <Icon as={HiOutlinePlus} />
        </Button>
        <Button variant="flat" size="sm">
          <Icon as={HiOutlineMenuAlt4} />
        </Button>
      </Flex>
      <Grid columns="minmax(300px, 2fr) 220px" css={{ border: '1px solid $blueGray100' }}>
        <Content />
        <QuestionSettings type={type} onChange={() => {}} />
      </Grid>
    </Grid>
  )
}

type QuestionUpdate =
  | {
      type?: AssignmentQuestionType.Text
      answer?: {
        hint: string
      }
      correctAnswers?: string[]
    }
  | {
      type?: AssignmentQuestionType.Number
      answer?: {
        hint: string
      }
      correctAnswers?: number[]
    }
  | {
      type?: AssignmentQuestionType.Choice
      answers?: {
        content: JSON
      }[]
      correctAnswers?: number[]
    }
  | {
      type?: AssignmentQuestionType.Image
      answer?: {
        hint: string
      }
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
