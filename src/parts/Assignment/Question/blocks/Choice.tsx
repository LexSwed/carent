import { Flex, Button, Checkbox, Icon, styled, TextField } from '@fxtrot/ui'
import React from 'react'
import { HiOutlinePhotograph, HiOutlineTrash } from 'react-icons/hi'

export const ChoiceBlock = () => {
  return (
    <Flex space="$2" cross="stretch">
      <Choice content="sadsa" />
      <Choice content="dasdasdas sdsa" />
      <ChoiceBox $transparent>
        <TextField variant="transparent" placeholder="Another option..." />
        <UploadOptionPhoto />
      </ChoiceBox>
    </Flex>
  )
}

const Choice: React.FC<{ content: string }> = ({ content }) => {
  return (
    <ChoiceBox>
      <TextField variant="transparent" defaultValue={content} />
      <Flex flow="row" space="$1">
        <UploadOptionPhoto />
        <Button variant="flat" size="sm" css={{ color: '$danger' }}>
          <Icon as={HiOutlineTrash} size="lg" />
        </Button>
      </Flex>
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
  p: '$3',
  br: '$lg',
  display: 'flex',
  alignItems: 'center',
  gap: '$6',

  variants: {
    $transparent: {
      true: {
        shadow: 'none',
      },
    },
  },
})

const UploadOptionPhoto = () => {
  return (
    <Button variant="flat" size="sm">
      <Icon as={HiOutlinePhotograph} size="lg" />
    </Button>
  )
}
