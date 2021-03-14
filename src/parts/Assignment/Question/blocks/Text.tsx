import React from 'react'
import { Flex, TextField, VisuallyHidden, Button, Icon } from '@fxtrot/ui'
import { HiOutlineX } from 'react-icons/hi'
import { useAnswers, useAnswersAtoms, useDeleteAnswer } from '../atoms'
import { PrimitiveAtom, useAtom } from 'jotai'

export const TextBlock = () => {
  return (
    <Flex space="$8" flow="row" wrap="wrap" cross="center">
      <TextField label="Your answer" secondaryLabel="(students will see this text field)" css={{ width: '40%' }} />
    </Flex>
  )
}

export const TextAnswers = () => {
  const [answers, updateList] = useAnswers()
  const answersAtoms = useAnswersAtoms()

  return (
    <Flex space="$4">
      <form
        onSubmit={(e) => {
          const answer = e.currentTarget.elements.namedItem('answer') as HTMLInputElement
          if (answer.value) {
            updateList((list) => [...list, { id: `${Date.now()}`, markedCorrect: true, text: answer.value }])
            e.preventDefault()
            answer.value = ''
          }
        }}
      >
        <VisuallyHidden {...({ as: 'button' } as any)} type="submit">
          Create
        </VisuallyHidden>
        <TextField name="answer" label="Add correct answers" hint="press Enter ↵ to add a new answer" type="text" />
      </form>
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
