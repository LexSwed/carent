import React from 'react'
import { Flex } from '@fxtrot/ui'

import Question from './Question'

const AssignmentBuilder = () => {
  return (
    <Flex space="$4">
      <Question />
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
