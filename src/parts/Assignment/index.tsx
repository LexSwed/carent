import React from 'react'
import { Box, Flex, Spinner } from '@fxtrot/ui'

import Question from './Question'
import { Card } from '../../shared/Card'
import { useAssignmentDetails } from './gql'
import NewQuestion from './Question/NewQuestion'

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

  const isFormEmpty = data?.assignment?.sections.every((s) => s.questions.length === 0)

  if (isFormEmpty) {
    return (
      <Flex space="$4">
        <Card>
          <NewQuestion />
        </Card>
      </Flex>
    )
  }

  return (
    <Flex space="$4">
      {data?.assignment?.sections?.map((section) => {
        return (
          <Card>
            {section.questions.map((q) => (
              <Question />
            ))}
          </Card>
        )
      })}
    </Flex>
  )
}

export default AssignmentBuilder

/**
 * content
 * question type
 * question answers
 * add after question
 * add before question
 * duplicate question
 * delete question
 * dragging should make all elements to show only `content`
 * "weight" of the option
 */
