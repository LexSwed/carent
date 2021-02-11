import React from 'react'
import { Flex, Spinner } from '@fxtrot/ui'

import Question from './Question'
import { Card } from '../../shared/Card'
import { useAssignmentDetails } from './gql'

const AssignmentBuilder = () => {
  const { data, loading } = useAssignmentDetails()

  return (
    <Flex space="$4">
      {loading ? (
        <Flex main="center" cross="center">
          <Spinner />
        </Flex>
      ) : (
        data?.assignment?.sections?.map((section) => {
          return (
            <Card>
              {section.questions.map((q) => (
                <Question />
              ))}
            </Card>
          )
        })
      )}
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
