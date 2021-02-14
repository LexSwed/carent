import React from 'react'
import { styled, Box, Button, Flex, Icon, Picker, ThemeProvider, Popover } from '@fxtrot/ui'
import { AssignmentQuestionType } from '@prisma/client'
import { HiOutlineDocumentDuplicate, HiOutlineTrash, HiOutlineClipboardCheck } from 'react-icons/hi'
import { TextAnswers, NumberAnswers, ChoiceAnswers } from './blocks'

const correctAnswersSetup = {
  [AssignmentQuestionType.Text]: TextAnswers,
  [AssignmentQuestionType.Number]: NumberAnswers,
  [AssignmentQuestionType.Choice]: ChoiceAnswers,
}

const QuestionSettings: React.FC<{
  type: AssignmentQuestionType
  onChange: (v: AssignmentQuestionType) => void
}> = ({ type, onChange }) => {
  const CorrectAnswersSetup = correctAnswersSetup[type]

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
              <Box width={240}>
                <CorrectAnswersSetup />
              </Box>
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
    value: AssignmentQuestionType.Text,
  },
  {
    label: 'Number input',
    value: AssignmentQuestionType.Number,
  },
  {
    label: 'Choice',
    value: AssignmentQuestionType.Choice,
  },
]

const SubCard = styled('div', {
  bc: '$blueGray50',
  borderTopRightRadius: '$sm',
  borderBottomRightRadius: '$sm',
  borderLeft: '1px solid $blueGray100',
  p: '$4',
})
