import React from 'react'
import { Button, Flex, Grid, Icon } from '@fxtrot/ui'

import type { AssignmentQuestionType } from '@prisma/client'
import QuestionContent from './QuestionContent'
import QuestionSettings from './Settings'
import { HiOutlineMenuAlt4, HiOutlinePlus } from 'react-icons/hi'

const QuestionCard = () => {
  const [type, setType] = React.useState<AssignmentQuestionType>('Text')
  return (
    <Grid columns="auto 1fr" gap="$2" css={{ alignItems: 'center' }}>
      <Flex flow="row" space="$1">
        <Button variant="flat" size="sm">
          <Icon as={HiOutlinePlus} />
        </Button>
        <Button variant="flat" size="sm">
          <Icon as={HiOutlineMenuAlt4} />
        </Button>
      </Flex>
      <Grid columns="minmax(300px, 2fr) 220px" css={{ border: '1px solid $blueGray100' }}>
        <QuestionContent />
        <QuestionSettings type={type} onChange={setType} />
      </Grid>
    </Grid>
  )
}

export default QuestionCard
