import React from 'react'
import { Picker } from '@fxtrot/ui'
import { AssignmentQuestionType } from '@prisma/client'
import { useUpdateQuestionType } from '../gql'

interface Props {
  questionId: string
  type: AssignmentQuestionType
}

const QuestionType: React.FC<Props> = ({ type, questionId }) => {
  const changeQuestionType = useUpdateQuestionType(questionId)
  return (
    <Picker value={type} onChange={changeQuestionType} label="Question type">
      {questionTypes.map(({ label, value }) => (
        <Picker.Item key={label} value={value} label={label} />
      ))}
    </Picker>
  )
}

export default QuestionType

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
