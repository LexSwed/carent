import React from 'react'
import { Box, Flex, Grid, styled, TextField } from '@fxtrot/ui'

import { Card } from '../../shared/Card'
import type { AssignmentQuestionType } from '@prisma/client'
import QuestionOptions from './QuestionOptions'
import QuestionSettings from './QuestionSettings'

const Question = () => {
  const [type, setType] = React.useState<AssignmentQuestionType>('Text')
  const [score, setScore] = React.useState(0)
  return (
    <Grid columns="minmax(300px, 2fr) 260px">
      <QuestionCard>
        <Flex space="$2">
          <Flex flow="row" main="end">
            <TextField
              type="number"
              label="points"
              flow="row-reverse"
              size="sm"
              variant="transparent"
              value={score}
              onChange={setScore}
              css={{ 'width': 80, '& input': { textAlign: 'right' } }}
            />
          </Flex>
          <Flex space="$4">
            <Box height={200} br="$sm" width="100%" bc="$surfaceHover">
              Content block
            </Box>
            <QuestionOptions type={type} />
          </Flex>
        </Flex>
      </QuestionCard>
      <QuestionSettings type={type} onChange={setType} />
    </Grid>
  )
}

export default Question

const QuestionCard = styled(Card, {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  zIndex: 10,
  pt: '$2',
})
