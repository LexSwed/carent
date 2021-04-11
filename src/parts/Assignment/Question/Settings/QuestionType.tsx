import React from 'react'
import { Picker, Item } from '@fxtrot/ui'
import { AssignmentQuestionType } from '@prisma/client'
import { useQuestionTypeAtom } from '../atoms'

const QuestionType = () => {
  const [type, setType] = useQuestionTypeAtom()
  return (
    <Picker value={type} onChange={(type: AssignmentQuestionType) => setType(type)} label="Question type">
      {questionTypes.map(({ label, value }) => (
        <Item key={label} value={value} label={label} />
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
