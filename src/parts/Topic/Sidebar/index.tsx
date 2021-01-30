import React from 'react'
import { Flex, Heading, Text } from '@fxtrot/ui'

import { useClassTopics } from '../gql'
import UserPanel from '../../UserPanel'
import { Card } from '../../Card'
import TopicList from '../../TopicList'

const Topics = () => {
  const { data } = useClassTopics()

  return (
    <Flex space="$4">
      <UserPanel />
      <Card>
        <Flex space="$4">
          <div>
            <Heading level={3} css={{ display: 'inline' }}>
              {data?.class?.name}
            </Heading>
            <Text size="lg"> topics</Text>
          </div>
          <TopicList />
        </Flex>
      </Card>
    </Flex>
  )
}

export default Topics
