import React, { useState } from 'react'
import { styled, Button, Flex, Icon, Picker, TextField, ThemeProvider, VisuallyHidden, Popover } from '@fxtrot/ui'
import type { AssignmentQuestionType } from '@prisma/client'
import { HiOutlineX, HiOutlineDocumentDuplicate, HiOutlineTrash, HiOutlineClipboardCheck } from 'react-icons/hi'

const QuestionSettings: React.FC<{
  type: AssignmentQuestionType
  onChange: (v: AssignmentQuestionType) => void
}> = ({ type, onChange }) => {
  const [answers, setCorrectAnswers] = useState<string[]>([])
  return (
    <SubCard>
      <Flex space="$4" main="spread" css={{ height: '100%' }}>
        <Flex space="$2">
          <Picker value={type} onChange={onChange as (v: string) => void} label="Question type">
            {questionTypes.map(({ label, value }) => (
              <Picker.Item key={label} value={value} label={label} />
            ))}
          </Picker>
          <Popover>
            <Popover.Trigger main="spread">
              Add correct answers
              <Icon as={HiOutlineClipboardCheck} />
            </Popover.Trigger>
            <Popover.Content placement="bottom-end">
              <Flex space="$4">
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
            </Popover.Content>
          </Popover>
        </Flex>
        <Flex space="$2">
          <Button main="spread">
            Duplicate
            <Icon as={HiOutlineDocumentDuplicate} />
          </Button>
          <ThemeProvider theme="red">
            <Button title="Delete question" main="spread" variant="primary">
              Delete
              <Icon as={HiOutlineTrash} />
            </Button>
          </ThemeProvider>
        </Flex>
      </Flex>
    </SubCard>
  )
}

export default QuestionSettings

const questionTypes: {
  value: AssignmentQuestionType
  label: string
}[] = [
  {
    label: 'Text input',
    value: 'Text',
  },
  {
    label: 'Choice',
    value: 'Choice',
  },
  {
    label: 'Number input',
    value: 'Number',
  },
]

const SubCard = styled('div', {
  bc: '$blueGray50',
  borderTopRightRadius: '$sm',
  borderBottomRightRadius: '$sm',
  borderLeft: '1px solid $blueGray100',
  p: '$4',
})
