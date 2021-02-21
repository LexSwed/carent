import { Box, Grid, Button, Checkbox, Flex, Icon, styled, TextField } from '@fxtrot/ui'
import React from 'react'
import { HiOutlinePhotograph, HiOutlinePlus } from 'react-icons/hi'

export const ChoiceBlock = () => {
  return (
    <Flex space="$2" cross="stretch">
      <Choice label="sadsa" />
      <Choice label="dasdasdas sdsa" />
      <Button main="center" variant="flat" css={{ color: '$primaryStill' }} size="lg" space="$4">
        <Icon as={HiOutlinePlus} />
        Another option
      </Button>
    </Flex>
  )
}

const Choice: React.FC<React.ComponentProps<typeof Checkbox>> = ({ label }) => {
  return (
    <ChoiceBox>
      <Grid gap="$4" columns="1fr 100px">
        <Box p="$3" flex={2}>
          <TextField variant="transparent" defaultValue={label} />
        </Box>
        <ImageBox>
          <Icon as={HiOutlinePhotograph} size="2xl" />
        </ImageBox>
      </Grid>
    </ChoiceBox>
  )
}

export const ChoiceAnswers: React.FC<{ answers: QuestionBlockFragment['answers'] }> = () => {
  return null
}

const ChoiceBox = styled('div', {
  minWidth: 160,
  maxHeight: 200,
  shadow: '$xs',
  br: '$lg',
})

const ImageBox = styled('div', {
  bc: '$surfaceHover',
  display: 'grid',
  placeItems: 'center',
})
