import { Box, Checkbox, Flex, styled, TextField } from '@fxtrot/ui'
import React from 'react'

export const ChoiceBlock = () => {
  return (
    <Flex space="$2" cross="stretch">
      <Choice label="sadsa" />
      <Choice label="dasdasdas sdsa" />
    </Flex>
  )
}

const Choice: React.FC<React.ComponentProps<typeof Checkbox>> = ({ label }) => {
  return (
    <ChoiceBox>
      <Flex flow="row" space="$2" main="spread">
        <Box p="$3" flex={2}>
          <Flex space="$2">
            <Checkbox label="Correct answer" />
            <TextField variant="transparent" defaultValue={label} />
          </Flex>
        </Box>
        <ImageBox></ImageBox>
      </Flex>
    </ChoiceBox>
  )
}

const ChoiceBox = styled('div', {
  minWidth: 160,
  maxHeight: 200,
  shadow: '$xs',
  br: '$lg',
})

const ImageBox = styled('div', {
  alignSelf: 'stretch',
  height: '100%',
  aspectRatio: '1/1',
  bc: '$surfaceHover',
})
