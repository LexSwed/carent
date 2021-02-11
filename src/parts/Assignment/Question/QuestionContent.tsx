import React from 'react'
import { Box, Flex, TextField } from '@fxtrot/ui'

import type { AssignmentQuestionType } from '@prisma/client'
import QuestionOptions from './QuestionOptions'

const QuestionContent = () => {
  const [type, setType] = React.useState<AssignmentQuestionType>('Text')
  const [score, setScore] = React.useState(0)
  return (
    <Box p="$4" pt="$2">
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
    </Box>
  )
}

export default QuestionContent
