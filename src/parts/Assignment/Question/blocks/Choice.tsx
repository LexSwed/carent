import React from 'react'
import { Flex, Button, Icon, styled, TextField } from '@fxtrot/ui'
import { HiOutlinePhotograph, HiOutlineTrash } from 'react-icons/hi'

interface Props {
  answers: {
    id: string
    markedCorrect: boolean
    content: string
  }[]
}

export const ChoiceBlock = ({ answers }: Props) => {
  return (
    <Flex space="$2" cross="stretch">
      {answers.map(({ id, content }) => {
        return <Choice content="sadsa" />
      })}
      <EmptyOption
        onChange={() => {
          console.log('create new option')
        }}
      />
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

const EmptyOption = ({ onChange }: { onChange: React.ComponentProps<typeof TextField>['onChange'] }) => {
  return (
    <ChoiceBox $transparent>
      <TextField variant="transparent" placeholder="Another option..." />
      <UploadOptionPhoto />
    </ChoiceBox>
  )
}
