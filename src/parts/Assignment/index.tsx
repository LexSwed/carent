import React from 'react'
import { Box, Flex, Spinner, TextField } from '@fxtrot/ui'

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
      {data?.assignment?.sections?.map((section) => {
        return (
          <Flex space="$2">
            <Flex>
              <TextField defaultValue={section.title} size="lg" placeholder="Section title" variant="transparent" />
              <TextField
                defaultValue={section.description}
                placeholder="Description of the section"
                variant="transparent"
                size="sm"
              />
            </Flex>
            <Card>
              {section.questions.map((q) => (
                <Question key={q.id} />
              ))}
            </Card>
          </Flex>
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
