import React from 'react'
import { Box, Flex, Grid } from '@fxtrot/ui'

import { AssignmentQuestionType } from '@prisma/client'

import { TextBlock, NumberBlock, ChoiceBlock } from './blocks'
import QuestionSettings from './Settings'

import Score from './Score'
import { useUpdateAnswers } from './gql'

interface Props extends QuestionBlockFragment {}

const Question = ({ id, type, answers }: Props) => {
  return (
    <Grid columns="minmax(300px, 2fr) 220px" css={{ border: '1px solid $primaryLight', br: '$md' }}>
      <Box p="$4" pt="$2" height="100%">
        <Flex space="$2" css={{ height: '100%' }}>
          <Score />
          <Flex main="spread" css={{ height: '100%' }}>
            <Box p="$4" br="$sm" width="100%" bc="$surfaceHover">
              Content block
            </Box>
            <QuestionType id={id} type={type} answers={answers} />
          </Flex>
        </Flex>
      </Box>
      <QuestionSettings id={id} type={type} answers={answers} />
    </Grid>
  )
}

export default Question

const QuestionType = ({ id, type, answers }: { id: Props['id']; type: Props['type']; answers: Props['answers'] }) => {
  const update = useUpdateAnswers(id)
  if (type === AssignmentQuestionType.Text) {
    return <TextBlock answers={answers as QuestionBlockAnswerFragment_TextQuestionAnswer_[]} />
  }
  if (type === AssignmentQuestionType.Number) {
    return <NumberBlock answers={answers as QuestionBlockAnswerFragment_NumberQuestionAnswer_[]} />
  }
  if (type === AssignmentQuestionType.Choice) {
    return <ChoiceBlock answers={answers as QuestionBlockAnswerFragment_ChoiceQuestionAnswer_[]} onChange={update} />
  }

  return null
}
