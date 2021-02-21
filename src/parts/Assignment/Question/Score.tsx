import React from 'react'
import { Flex, TextField } from '@fxtrot/ui'

const Score = () => {
  const [score, setScore] = React.useState(0)
  return (
    <Flex flow="row" main="end">
      <TextField
        type="number"
        label="points"
        flow="row-reverse"
        size="sm"
        variant="underlined"
        value={score}
        onChange={setScore}
        css={{ 'width': 100, '& input': { textAlign: 'right' } }}
      />
    </Flex>
  )
}

export default Score
