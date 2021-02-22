import React from 'react'
import { Box, Flex, Spinner } from '@fxtrot/ui'

import Question from './Question'
import { Card } from '../../shared/Card'
import { useAssignmentDetails } from './gql'
import AssignmentHeader from './AssignmentHeader'

const AssignmentBuilder = () => {
  const { data, loading } = useAssignmentDetails()

  if (loading) {
    return (
      <Box height={400}>
        <Flex main="center" cross="center">
          <Spinner />
        </Flex>
      </Box>
    )
  }

  return (
    <Flex space="$2">
      <AssignmentHeader />
      {data?.assignment?.variants?.map((variant) => {
        return (
          <Card>
            {variant.questions.map((q) => (
              <Question {...q} key={q.id} />
            ))}
          </Card>
        )
      })}
    </Flex>
  )
}

export default AssignmentBuilder
