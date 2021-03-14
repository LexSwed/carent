import React from 'react'
import { Flex, Button, Icon, styled, TextField } from '@fxtrot/ui'
import { HiOutlinePhotograph, HiOutlineTrash } from 'react-icons/hi'
import { useAnswers, useAnswersAtoms, useCreateAnswer, useDeleteAnswer } from '../atoms'
import { PrimitiveAtom, useAtom } from 'jotai'

import SingleFieldForm from '../../../../shared/SingleFieldForm'

type Answer = {
  id: string
  markedCorrect: boolean
  content: string
}

export const ChoiceBlock = () => {
  const answersAtoms = useAnswersAtoms()
  const [answers] = useAnswers()

  return (
    <Flex space="$2" cross="stretch">
      {answersAtoms.map((atom, i) => {
        return <Choice key={answers[i].id} atom={atom as PrimitiveAtom<Answer>} />
      })}
      <EmptyOption />
    </Flex>
  )
}

const Choice = ({ atom }: { atom: PrimitiveAtom<Answer> }) => {
  const [{ content, id, markedCorrect }, update] = useAtom(atom)
  const onDelete = useDeleteAnswer(id)
  return (
    <ChoiceBox>
      <TextField
        variant="transparent"
        defaultValue={content}
        onBlur={(e) => update({ id, content: e.target.value, markedCorrect })}
      />
      <Flex flow="row" space="$1">
        <UploadOptionPhoto />
        <Button variant="flat" size="sm" css={{ color: '$danger' }} onClick={onDelete}>
          <Icon as={HiOutlineTrash} size="lg" />
        </Button>
      </Flex>
    </ChoiceBox>
  )
}

export const ChoiceAnswers = () => {
  return null
}

const ChoiceBox = styled('div', {
  minWidth: 160,
  maxHeight: 200,
  border: '1px solid $borderLight',
  py: '$1',
  px: '$2',
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

const EmptyOption = () => {
  const create = useCreateAnswer()
  return (
    <ChoiceBox $transparent>
      <SingleFieldForm
        variant="transparent"
        type="text"
        placeholder="Another option..."
        submitText="Add the option"
        name="new-option"
        onSubmit={(answer) => {
          console.log(answer)
          create({ markedCorrect: true, content: answer.value })
        }}
      />
      <UploadOptionPhoto />
    </ChoiceBox>
  )
}
