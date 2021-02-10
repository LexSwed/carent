import React from 'react'
import { Grid, Button, Icon, styled } from '@fxtrot/ui'

import type { AssignmentQuestionType } from '@prisma/client'
import QuestionCard from './Body'
import QuestionSettings from './Settings'
import { HiOutlinePlusCircle } from 'react-icons/hi'

const Question = () => {
  const [type, setType] = React.useState<AssignmentQuestionType>('Text')
  return (
    <>
      <Grid columns="minmax(300px, 2fr) 260px">
        <>
          <QuestionCard />
          <QuestionSettings type={type} onChange={setType} />
        </>
        <>
          <AddBlockContainer>
            <Button size="xs" variant="flat">
              <Icon as={HiOutlinePlusCircle} size="lg" />
            </Button>
          </AddBlockContainer>
          <div />
        </>
      </Grid>
    </>
  )
}

export default Question

const AddBlockContainer = styled('div', {
  'textAlign': 'center',
  'transition': 'transform 0.24s ease-in-out',
  '&:hover, &:focus-within': {
    transform: 'none',
  },
})
