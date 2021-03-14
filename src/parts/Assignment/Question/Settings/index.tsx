import React from 'react'
import { styled, Box, Button, Flex, Icon, Popover } from '@fxtrot/ui'
import { AssignmentQuestionType } from '@prisma/client'
import { HiOutlineDocumentDuplicate, HiOutlineClipboardCheck } from 'react-icons/hi'

import { TextAnswers, NumberAnswers, ChoiceAnswers } from '../blocks'
import { DeleteQuestionBlock } from './DeleteQuestionBlock'
import QuestionType from './QuestionType'
import { useQuestionTypeAtom } from '../atoms'

interface Props {
  id: QuestionBlockFragment['id']
}

const correctAnswersSetup: Record<AssignmentQuestionType, React.ElementType> = {
  [AssignmentQuestionType.Text]: TextAnswers,
  [AssignmentQuestionType.Number]: NumberAnswers,
  [AssignmentQuestionType.Choice]: ChoiceAnswers,
  [AssignmentQuestionType.Image]: () => null,
  [AssignmentQuestionType.Document]: () => null,
}

const QuestionSettings: React.FC<Props> = ({ id }) => {
  const [type] = useQuestionTypeAtom()
  const CorrectAnswersSetup = correctAnswersSetup[type]

  return (
    <SubCard>
      <Flex space="$4" main="spread" css={{ height: '100%' }}>
        <Flex space="$2">
          <QuestionType />
          <Popover>
            <Popover.Trigger main="spread">
              Correct answers
              <Icon as={HiOutlineClipboardCheck} />
            </Popover.Trigger>
            <Popover.Content placement="bottom-end">
              <Box width={240}>
                <CorrectAnswersSetup />
              </Box>
            </Popover.Content>
          </Popover>
        </Flex>
        <Flex space="$2" main="end" flow="row">
          <Button main="spread" title="Duplicate">
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
