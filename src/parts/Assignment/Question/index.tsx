import React from 'react'
import { gql, useApolloClient } from '@apollo/client'
import { Box, Button, Flex, Grid, Icon } from '@fxtrot/ui'

import { AssignmentQuestionType } from '@prisma/client'
import { HiOutlineMenuAlt4, HiOutlinePlus } from 'react-icons/hi'

import { TextBlock, NumberBlock, ChoiceBlock } from './blocks'
import QuestionSettings from './Settings'

import Score from './Score'

const content = {
  [AssignmentQuestionType.Text]: TextBlock,
  [AssignmentQuestionType.Number]: NumberBlock,
  [AssignmentQuestionType.Choice]: ChoiceBlock,
}

type Props = GetAssignmentDetailsQuery['assignment']['sections'][number]['questions'][number]

const Question = ({ id, type, answers, ...props }: Props) => {
  const QuestionBlock = content[type]
  const client = useApolloClient()

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
      <Grid columns="minmax(300px, 2fr) 220px" css={{ border: '1px solid $primaryLight', br: '$md' }}>
        <Box p="$4" pt="$2">
          <Flex space="$2">
            <Score />
            <Flex space="$4">
              <Box height={200} br="$sm" width="100%" bc="$surfaceHover">
                Content block
              </Box>
              <QuestionBlock answers={answers} />
            </Flex>
          </Flex>
        </Box>
        <QuestionSettings
          type={type}
          answers={answers}
          onChange={(type) => {
            client.cache.writeFragment({
              id: client.cache.identify({
                __typename: 'AssignmentQuestion',
                id,
              }),
              fragment: gql`
                fragment QuestionBlockTypeUpdate on AssignmentQuestion {
                  type
                }
              `,
              data: {
                type,
              },
            })
          }}
        />
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
  fragment QuestionBlockFragment on AssignmentQuestion {
    id
    content
    type
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

export default Question
