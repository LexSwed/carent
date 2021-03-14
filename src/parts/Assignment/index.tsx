import React from 'react'
import { Box, Flex, Spinner } from '@fxtrot/ui'

import QuestionBlock from './QuestionBlock'
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
          <Card key={variant.id}>
            <Flex space="$4">
              {variant.questions.map((q) => (
                <QuestionBlock {...q} variantId={variant.id} key={q.id} />
              ))}
            </Flex>
          </Card>
        )
      })}
    </Flex>
  )
}

export default AssignmentBuilder
