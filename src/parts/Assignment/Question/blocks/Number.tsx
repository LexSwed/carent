import React from 'react'
import { Flex, TextField, Button, Icon } from '@fxtrot/ui'
import { HiOutlineX } from 'react-icons/hi'
import { useAnswers, useAnswersAtoms, useCreateAnswer, useDeleteAnswer } from '../atoms'
import { PrimitiveAtom, useAtom } from 'jotai'

import SingleFieldForm from '../../../../shared/SingleFieldForm'

export { TextBlock as NumberBlock } from './Text'

export const NumberAnswers = () => {
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
        type="number"
        onSubmit={(answer) => {
          create({ markedCorrect: true, number: answer.valueAsNumber })
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
  number: number
}

const TextAnswer = ({ atom }: { atom: PrimitiveAtom<Answer> }) => {
  const [{ number, id, markedCorrect }, update] = useAtom(atom)
  const onDelete = useDeleteAnswer(id)

  return (
    <Flex flow="row" cross="center" space="$2">
      <TextField
        value={number}
        onChange={(v) => update({ number: v, markedCorrect, id })}
        type="number"
        validity="valid"
        size="sm"
      />
      <Button variant="flat" size="sm" onClick={onDelete}>
        <Icon as={HiOutlineX} />
      </Button>
    </Flex>
  )
}
