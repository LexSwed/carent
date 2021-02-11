import React from 'react'
import { Grid } from '@fxtrot/ui'

import type { AssignmentQuestionType } from '@prisma/client'
import QuestionCard from './Body'
import QuestionSettings from './Settings'

const Question = () => {
  const [type, setType] = React.useState<AssignmentQuestionType>('Text')
  return (
    <>
      <Grid columns="minmax(300px, 2fr) 260px">
        <QuestionCard />
        <QuestionSettings type={type} onChange={setType} />
      </Grid>
    </>
  )
}

export default Question
