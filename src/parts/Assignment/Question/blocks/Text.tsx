import React, { useState } from 'react'
import { Box, Grid, Flex, TextField, VisuallyHidden, Button, Icon } from '@fxtrot/ui'
import { HiOutlineX } from 'react-icons/hi'

export const TextBlock = () => {
  const [hint, setHint] = React.useState('Enter correct answer')
  return (
    <Grid columns="1fr 1fr" gap="$4">
      <Flex space="$1" cross="start">
        <TextField
          value={hint}
          onChange={setHint}
          hint="You can edit text inside the input"
          css={{
            '& input': {
              color: '$textSubtle',
            },
          }}
        />
      </Flex>
    </Grid>
  )
}

export const TextAnswers = () => {
  const [answers, setCorrectAnswers] = useState<string[]>([])
  return (
    <Flex space="$4" as={Box} width={240}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setCorrectAnswers([...answers, (e.currentTarget as any).elements.answer.value])
          ;(e.currentTarget as any).elements.answer.value = ''
        }}
      >
        <VisuallyHidden {...({ as: 'button' } as any)} type="submit" />
        <TextField label="Add correct answers" hint="press Enter ↵ to add a new answer" name="answer" />
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
              type="text"
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
