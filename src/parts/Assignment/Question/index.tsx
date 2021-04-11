import React from 'react'
import { Box, Flex, Grid } from '@fxtrot/ui'
import { Provider } from 'jotai'
import { AssignmentQuestionType } from '@prisma/client'

import { TextBlock, NumberBlock, ChoiceBlock } from './blocks'
import QuestionSettings from './Settings'

import Score from './Score'
import { useSyncedQuestionTypeAtom, useSyncedQuestionAnswers } from './atoms'

interface Props extends QuestionBlockFragment {}

const Question = ({ id, type: propType, score, answers: propAnswers }: Props) => {
  const type = useSyncedQuestionTypeAtom(propType)
  useSyncedQuestionAnswers(propAnswers)

  return (
    <Grid columns="minmax(300px, 2fr) 220px" css={{ border: '1px solid $primaryLight', br: '$md' }}>
      <Box p="$4" pt="$2" height="100%">
        <Flex gap="2" css={{ height: '100%' }}>
          <Score score={score} />
          <Flex main="space-between" gap="2" css={{ height: '100%' }}>
            <Box p="$4" br="$sm" width="100%" bc="$surfaceHover">
              Content block
            </Box>
            <QuestionTypeAnswers type={type} />
          </Flex>
        </Flex>
      </Box>
      <QuestionSettings id={id} />
    </Grid>
  )
}

const QuestionWithLocalState = (props: Props) => {
  return (
    <Provider>
      <Question {...props} />
    </Provider>
  )
}

export default QuestionWithLocalState

const QuestionTypeAnswers = ({ type }: { type: AssignmentQuestionType }) => {
  if (type === AssignmentQuestionType.Text) {
    return <TextBlock />
  }
  if (type === AssignmentQuestionType.Number) {
    return <NumberBlock />
  }
  if (type === AssignmentQuestionType.Choice) {
    return <ChoiceBlock />
  }

  return null
}
