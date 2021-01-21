import React from 'react'
import { Flex, Box } from '@fxtrot/ui'

import { useTopicId } from '../../../utils'
import Header from './Header'
import Placeholder from './Placeholder'
import { Card } from '../../Card'

const Topic = () => {
  const topicId = useTopicId()

  if (!topicId) {
    return <Placeholder />
  }

  return (
    <Flex space="$4">
      <Header />
      <Card>
        <Flex space="$8" key={topicId}>
          <Box p="$4">Content</Box>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Topic
