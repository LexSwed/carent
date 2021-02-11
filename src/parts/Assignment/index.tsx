import React from 'react'
import { Flex } from '@fxtrot/ui'

import Question from './Question'
import { Card } from '../../shared/Card'

const AssignmentBuilder = () => {
  return (
    <Flex space="$4">
      <Card>
        <Question />
      </Card>
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
