import React from 'react'
import { Box, Button, Flex, Grid, Picker, ThemeProvider, Text, styled, Icon } from '@fxtrot/ui'

import { Card } from '../../shared/Card'
import type { AssignmentQuestionType } from '@prisma/client'
import { HiOutlineDocumentDuplicate, HiOutlineTrash } from 'react-icons/hi'

const questionTypes: {
  value: AssignmentQuestionType
  label: string
}[] = [
  {
    label: 'Text input',
    value: 'Text',
  },
  {
    label: 'Choice',
    value: 'Choice',
  },
  {
    label: 'Number input',
    value: 'Number',
  },
]

const Question = () => {
  return (
    <Grid columns="minmax(300px, 2fr) 260px">
      <QuestionCard>card</QuestionCard>
      <SubCard>
        <Flex main="spread" space="$4">
          <Picker defaultValue={questionTypes[0].value} label="Question type">
            {questionTypes.map(({ label, value }) => (
              <Picker.Item key={label} value={value} label={label} />
            ))}
          </Picker>
          <Box height={200}>Some question info like total weight, selection of correct answers</Box>
          <Flex space="$2">
            <Button main="start">
              <Box width="20%" />
              <Icon as={HiOutlineDocumentDuplicate} />
              Duplicate
            </Button>
            <ThemeProvider theme="red">
              <Button variant="primary" main="start">
                <Box width="20%" />
                <Icon as={HiOutlineTrash} />
                Delete
              </Button>
            </ThemeProvider>
          </Flex>
        </Flex>
      </SubCard>
    </Grid>
  )
}

export default Question

const QuestionCard = styled(Card, {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  zIndex: 10,
})

const SubCard = styled('div', {
  bc: '$blueGray50',
  borderTopRightRadius: '$lg',
  borderBottomRightRadius: '$lg',
  p: '$6',
  float: 'right',
  shadow: '$sm',
})

const ButtonGrid = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '20% auto',
  justifyContent: 'center',
})
