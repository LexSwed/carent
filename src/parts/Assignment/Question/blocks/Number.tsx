import React, { useState } from 'react'
import { Flex, VisuallyHidden, TextField, Button, Icon } from '@fxtrot/ui'
import { HiOutlineX } from 'react-icons/hi'

export { TextBlock as NumberBlock } from './Text'

export const NumberAnswers = () => {
  const [answers, setCorrectAnswers] = useState<number[]>([])
  return (
    <Flex space="$4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setCorrectAnswers([...answers, (e.currentTarget as any).elements.answer.value])
          ;(e.currentTarget as any).elements.answer.value = ''
        }}
      >
        <VisuallyHidden {...({ as: 'button' } as any)} type="submit" />
        <TextField label="Add correct answers" hint="press Enter ↵ to add a new answer" name="answer" type="number" />
      </form>
      <Flex space="$2">
        {answers.map((label, i) => (
          <Flex flow="row" cross="center" space="$2">
            <TextField
              value={label}
              onChange={(v) =>
                setCorrectAnswers((answers) => {
                  answers[i] = v
                  return [...answers]
                })
              }
              type="number"
              validity="valid"
              size="sm"
            />
            <Button
              variant="flat"
              size="sm"
              onClick={() => setCorrectAnswers([...answers.slice(0, i), ...answers.slice(i + 1)])}
            >
              <Icon as={HiOutlineX} />
            </Button>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
