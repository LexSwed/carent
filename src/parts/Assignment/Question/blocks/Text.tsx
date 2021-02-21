import React from 'react'
import { Grid, Flex, TextField, VisuallyHidden, Button, Icon } from '@fxtrot/ui'
import { HiOutlineX } from 'react-icons/hi'

type Props = { answers: { hint: string; id: string }[] }

export const TextBlock: React.FC<Props> = ({ answers }) => {
  const [hint, setHint] = React.useState(answers?.[0]?.hint || 'Enter correct answer')
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
        <TextField label="Add correct answers" hint="press Enter ↵ to add a new answer" name="answer" />
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
