import React from 'react'
import { styled, Box, Button, Flex, Icon, Popover } from '@fxtrot/ui'
import { AssignmentQuestionType } from '@prisma/client'
import { DocumentDuplicateIcon, ClipboardCheckIcon } from '@heroicons/react/outline'

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
      <Flex gap="4" main="space-between" css={{ height: '100%' }}>
        <Flex gap="2">
          <QuestionType />
          <Popover>
            <Button main="space-between">
              Correct answers
              <Icon as={ClipboardCheckIcon} />
            </Button>
            <Popover.Content placement="bottom-end">
              <Box width={240}>
                <CorrectAnswersSetup />
              </Box>
            </Popover.Content>
          </Popover>
        </Flex>
        <Flex gap="2" main="end" flow="row">
          <Button main="center" title="Duplicate">
            <Icon as={DocumentDuplicateIcon} />
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
