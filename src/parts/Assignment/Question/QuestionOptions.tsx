import React, { useState } from 'react'

import type { AssignmentQuestionType } from '@prisma/client'
import { Flex, Grid, TextField } from '@fxtrot/ui'

interface Props {
  type: AssignmentQuestionType
}

const QuestionOptions: React.FC<Props> = ({ type }) => {
  switch (type) {
    case 'Choice':
      return <ChoiceOptions />
    case 'Number':
      return <NumberOption />
    case 'Text':
      return <TextOption />
    default:
      return null
  }
}

export default QuestionOptions

const ChoiceOptions = () => {
  return <>Choice</>
}
const NumberOption = () => {
  return <>Number</>
}
const TextOption = () => {
  const [hint, setHint] = useState('Enter correct answer')
  return (
    <Grid columns="1fr 1fr" gap="$4">
      <Flex space="$1" cross="start">
        <TextField
          value={hint}
          onChange={setHint}
          hint="You can edit text inside the input"
          css={{
            '& input': {
              color: '$textSubtle',
            },
          }}
        />
      </Flex>
    </Grid>
  )
}
