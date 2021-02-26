import React from 'react'
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

interface Props extends QuestionBlockFragment {}

const Question = ({ id, type, answers }: Props) => {
  const QuestionBlock = content[type]

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
        <QuestionSettings id={id} type={type} answers={answers} />
      </Grid>
    </Grid>
  )
}

export default Question
