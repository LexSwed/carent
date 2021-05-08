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

export const Flex = styled('div', {
  display: 'flex',
  variants: {
    wrap: {
      'wrap': {
        flexWrap: 'wrap',
      },
      'no-wrap': {
        flexWrap: 'nowrap',
      },
      'wrap-reverse': {
        flexWrap: 'wrap-reverse',
      },
    },
    flow: {
      'row': {
        flexDirection: 'row',
      },
      'column': {
        flexDirection: 'column',
      },
      'row-reverse': {
        flexDirection: 'row-reverse',
      },
      'column-reverse': {
        flexDirection: 'column-reverse',
      },
    },
    main: {
      'start': {
        justifyContent: 'flex-start',
      },
      'center': {
        justifyContent: 'center',
      },
      'end': {
        justifyContent: 'flex-end',
      },
      'stretch': {
        justifyContent: 'stretch',
      },
      'space-between': {
        justifyContent: 'space-between',
      },
    },
    cross: {
      start: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'flex-end',
      },
      stretch: {
        alignItems: 'stretch',
      },
    },
    gap: {
      none: {
        gap: 0,
      },
      sm: {
        gap: '4px',
      },
      md: {
        gap: '8px',
      },
      lg: {
        gap: '16px',
      },
    },
    display: {
      flex: {
        display: 'flex',
      },
      inline: {
        display: 'inline-flex',
      },
    },
  },
})

export const Row = styled(Flex, {
  flexDirection: 'row',
  variants: {
    reverse: {
      true: {
        flexDirection: 'row-reverse',
      },
    },
  },
})

export const Column = styled(Flex, {
  flexDirection: 'column',
  variants: {
    reverse: {
      true: {
        flexDirection: 'row-reverse',
      },
    },
  },
})
