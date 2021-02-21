import React from 'react'
import { Grid, Flex, TextField, VisuallyHidden, Button, Text, Icon } from '@fxtrot/ui'
import { HiOutlineX } from 'react-icons/hi'

type Props = { answers: { hint: string; id: string }[] }

export const TextBlock: React.FC<Props> = ({ answers }) => {
  return (
    <Flex space="$8" flow="row" wrap="wrap" cross="center">
      <TextField value="Your answer..." onChange={() => {}} css={{ width: '40%' }} />
      <Text tone="light" size="xs" css={{ flex: 2 }}>
        Students will see this input field
      </Text>
    </Flex>
  )
}

interface AnswersProps {
  answers: QuestionBlockFragment['answers']
}

export const TextAnswers: React.FC<AnswersProps> = ({ answers }) => {
  return (
    <Flex space="$4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const answer = e.currentTarget.elements.namedItem('answer') as HTMLInputElement
          answer.value = ''
        }}
      >
        <VisuallyHidden {...({ as: 'button' } as any)} type="submit" />
        <TextField name="answer" label="Add correct answers" hint="press Enter ↵ to add a new answer" type="text" />
      </form>
      <Flex space="$2">
        {answers.map((answer: QuestionBlockAnswerFragment_TextQuestionAnswer_, i) => {
          return (
            <Flex flow="row" key={answer.id} cross="center" space="$2">
              <TextField
                value={answer.text}
                onChange={(v) => console.log({ newValue: v })}
                type="text"
                validity="valid"
                size="sm"
              />
              <Button
                variant="flat"
                size="sm"
                onClick={() => {
                  console.log('delete', { text: answer.text, i })
                }}
              >
                <Icon as={HiOutlineX} />
              </Button>
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}
