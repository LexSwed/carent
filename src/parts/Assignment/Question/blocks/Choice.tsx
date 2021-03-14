import React from 'react'
import { Flex, Button, Icon, styled, TextField } from '@fxtrot/ui'
import { HiOutlinePhotograph, HiOutlineTrash } from 'react-icons/hi'
import { useAnswers, useAnswersAtoms, useDeleteAnswer } from '../atoms'
import { PrimitiveAtom, useAtom } from 'jotai'

type Answer = {
  id: string
  markedCorrect: boolean
  content: string
}

export const ChoiceBlock = () => {
  const answersAtoms = useAnswersAtoms()
  const [answers, updateList] = useAnswers()

  return (
    <Flex space="$2" cross="stretch">
      {answersAtoms.map((atom, i) => {
        return <Choice key={answers[i].id} atom={atom as PrimitiveAtom<Answer>} />
      })}
      <EmptyOption
        onCreate={(content) => {
          updateList((answers) => [...answers, { id: `${Date.now()}`, content, markedCorrect: false }])
        }}
      />
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

const EmptyOption = ({ onCreate }: { onCreate: (content: any) => void }) => {
  return (
    <ChoiceBox $transparent>
      <TextField
        variant="transparent"
        type="text"
        placeholder="Another option..."
        onBlur={(e) => {
          if (e.target.value) {
            onCreate(e.target.value)
            e.target.value = ''
          }
        }}
      />
      <UploadOptionPhoto />
    </ChoiceBox>
  )
}
