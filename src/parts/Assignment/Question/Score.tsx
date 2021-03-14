import React from 'react'
import { Flex, TextField } from '@fxtrot/ui'
import { useScoreAtom } from './atoms'

interface Props {
  score: number
}
const Score = ({ score }: Props) => {
  const [scoreValue, setScore] = useScoreAtom(score)
  return (
    <Flex flow="row" main="end">
      <TextField
        type="number"
        label="points"
        flow="row-reverse"
        size="sm"
        variant="underlined"
        value={scoreValue}
        onChange={setScore}
        css={{ 'width': 100, '& input': { textAlign: 'right' } }}
      />
    </Flex>
  )
}

export default Score
