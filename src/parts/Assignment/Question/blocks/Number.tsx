import React, { useState } from 'react'
import { Flex, VisuallyHidden, TextField, Button, Icon } from '@fxtrot/ui'
import { HiOutlineX } from 'react-icons/hi'

export { TextBlock as NumberBlock } from './Text'

interface Props {
  answers: QuestionBlockFragment['answers']
}

export const NumberAnswers: React.FC<Props> = ({ answers }) => {
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
        <TextField label="Add correct answers" hint="press Enter ↵ to add a new answer" name="answer" />
      </form>
      <Flex space="$2">
        {answers.map((answer: QuestionBlockAnswerFragment_NumberQuestionAnswer_, i) => {
          return (
            <Flex flow="row" key={answer.id} cross="center" space="$2">
              <TextField
                value={answer.number}
                onChange={(v) => console.log({ newValue: v })}
                validity="valid"
                type="number"
                size="sm"
              />
              <Button
                variant="flat"
                size="sm"
                onClick={() => {
                  console.log('delete', { number: answer.number, i })
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
