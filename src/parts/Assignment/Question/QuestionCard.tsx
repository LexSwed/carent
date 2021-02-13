import React from 'react'
import { Button, Flex, Grid, Icon } from '@fxtrot/ui'

import { AssignmentQuestionType } from '@prisma/client'
import { HiOutlineMenuAlt4, HiOutlinePlus } from 'react-icons/hi'

import QuestionSettings from './Settings'

import TextContent from './content/Text'

const content = {
  [AssignmentQuestionType.Text]: TextContent,
}

const QuestionCard: React.FC<Props> = ({ type, onUpdate, onAdd }) => {
  const Content = content[type]

  return (
    <Grid columns="auto 1fr" gap="$2" css={{ alignItems: 'center' }}>
      <Flex flow="row" space="$1">
        <Button variant="flat" size="sm" onClick={() => onAdd()}>
          <Icon as={HiOutlinePlus} />
        </Button>
        <Button variant="flat" size="sm">
          <Icon as={HiOutlineMenuAlt4} />
        </Button>
      </Flex>
      <Grid columns="minmax(300px, 2fr) 220px" css={{ border: '1px solid $blueGray100' }}>
        <Content />
        <QuestionSettings />
      </Grid>
    </Grid>
  )
}

export default QuestionCard

interface Props {
  type: AssignmentQuestionType
  onAdd?: () => void
  onUpdate: (update: QuestionUpdate) => void
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

// sections = atom([{ title, description }, { title, description }])
// questions = atom({
//   [id]: {
//     id
//     type
//     points
//     hint
//     answers: []
//     correctAnswers: []
//   }
// })
