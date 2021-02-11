import React from 'react'
import { Box, Grid, Flex, TextField } from '@fxtrot/ui'
import Score from '../Score'

const TextQuestion = () => {
  const [hint, setHint] = React.useState('Enter correct answer')
  return (
    <Box p="$4" pt="$2">
      <Flex space="$2">
        <Score />
        <Flex space="$4">
          <Box height={200} br="$sm" width="100%" bc="$surfaceHover">
            Content block
          </Box>

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
        </Flex>
      </Flex>
    </Box>
  )
}

export default TextQuestion
