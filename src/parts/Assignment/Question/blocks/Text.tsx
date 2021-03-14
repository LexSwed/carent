import React from 'react'
import { Flex, TextField, Button, Icon } from '@fxtrot/ui'
import { HiOutlineX } from 'react-icons/hi'
import { useAnswers, useAnswersAtoms, useCreateAnswer, useDeleteAnswer } from '../atoms'
import { PrimitiveAtom, useAtom } from 'jotai'
import SingleFieldForm from '../../../../shared/SingleFieldForm'

export const TextBlock = () => {
  return (
    <Flex space="$8" flow="row" wrap="wrap" cross="center">
      <TextField label="Your answer" secondaryLabel="(students will see this text field)" css={{ width: '40%' }} />
    </Flex>
  )
}

export const TextAnswers = () => {
  const [answers] = useAnswers()
  const answersAtoms = useAnswersAtoms()
  const create = useCreateAnswer()

  return (
    <Flex space="$4">
      <SingleFieldForm
        submitText="Add this answer"
        name="answer"
        label="Add correct answers"
        hint="press Enter ↵ to add a new answer"
        type="text"
        onSubmit={(answer) => {
          create({ markedCorrect: true, text: answer.value })
        }}
      />
      <Flex space="$2">
        {answersAtoms.map((atom, i) => {
          return <TextAnswer atom={atom as PrimitiveAtom<Answer>} key={answers[i].id} />
        })}
      </Flex>
    </Flex>
  )
}

type Answer = {
  id: string
  markedCorrect: boolean
  text: string
}

const TextAnswer = ({ atom }: { atom: PrimitiveAtom<Answer> }) => {
  const [{ text, id, markedCorrect }, update] = useAtom(atom)
  const onDelete = useDeleteAnswer(id)

  return (
    <Flex flow="row" cross="center" space="$2">
      <TextField
        value={text}
        onChange={(v) => update({ text: v, markedCorrect, id })}
        type="text"
        validity="valid"
        size="sm"
      />
      <Button variant="flat" size="sm" onClick={onDelete}>
        <Icon as={HiOutlineX} />
      </Button>
    </Flex>
  )
}
