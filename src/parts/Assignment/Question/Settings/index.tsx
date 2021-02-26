import React from 'react'
import { styled, Box, Button, Flex, Icon, Popover } from '@fxtrot/ui'
import { AssignmentQuestionType } from '@prisma/client'
import { HiOutlineDocumentDuplicate, HiOutlineClipboardCheck } from 'react-icons/hi'

import { TextAnswers, NumberAnswers, ChoiceAnswers } from '../blocks'
import { DeleteQuestionBlock } from './DeleteQuestionBlock'
import QuestionType from './QuestionType'

interface Props {
  id: QuestionBlockFragment['id']
  type: QuestionBlockFragment['type']
  answers: QuestionBlockFragment['answers']
}

const correctAnswersSetup: Record<
  AssignmentQuestionType,
  React.ElementType<{
    answers: QuestionBlockFragment['answers']
  }>
> = {
  [AssignmentQuestionType.Text]: TextAnswers,
  [AssignmentQuestionType.Number]: NumberAnswers,
  [AssignmentQuestionType.Choice]: ChoiceAnswers,
  [AssignmentQuestionType.Image]: () => null,
  [AssignmentQuestionType.Document]: () => null,
}

const QuestionSettings: React.FC<Props> = ({ id, type, answers }) => {
  const CorrectAnswersSetup = correctAnswersSetup[type]

  return (
    <SubCard>
      <Flex space="$4" main="spread" css={{ height: '100%' }}>
        <Flex space="$2">
          <QuestionType questionId={id} type={type} />
          <Popover>
            <Popover.Trigger main="spread">
              Add correct answers
              <Icon as={HiOutlineClipboardCheck} />
            </Popover.Trigger>
            <Popover.Content placement="bottom-end">
              <Box width={240}>
                <CorrectAnswersSetup answers={answers} />
              </Box>
            </Popover.Content>
          </Popover>
        </Flex>
        <Flex space="$2">
          <Button main="spread">
            Duplicate
            <Icon as={HiOutlineDocumentDuplicate} />
          </Button>
          <DeleteQuestionBlock questionId={id} />
        </Flex>
      </Flex>
    </SubCard>
  )
}

export default QuestionSettings

const SubCard = styled('div', {
  bc: '$blueGray50',
  borderTopRightRadius: '$sm',
  borderBottomRightRadius: '$sm',
  borderLeft: '1px solid $blueGray100',
  p: '$4',
})
