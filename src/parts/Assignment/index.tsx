import React from 'react'
import { Box, Flex, Spinner, TextField } from '@fxtrot/ui'

import Question from './Question'
import { Card } from '../../shared/Card'
import { useAssignmentDetails } from './gql'
import AssignmentHeader from './AssignmentHeader'
import Section from './Section'

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
          <Flex space="$2" key={section.id}>
            <Section {...section} />
            <Card>
              {section.questions.map((q) => (
                <Question {...q} key={q.id} />
              ))}
            </Card>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default AssignmentBuilder
