import React from 'react'
import { Flex, Heading, TextLink } from '@fxtrot/ui'

import { useClassTopics } from '../gql'
import UserPanel from '../../UserPanel'
import { Card } from '../../Card'
import TopicList from '../../TopicList'
import { useClassId } from '../../../utils'

const Topics = () => {
  const { data } = useClassTopics()
  const classId = useClassId()

  return (
    <Flex space="$4">
      <UserPanel />
      <Card>
        <TopicList
          title={<Heading level={3}>All topics</Heading>}
          subtitle={
            <TextLink to={`/${classId}`} size="xs" tone="light" css={{ color: '$textLight', fontWeight: 'normal' }}>
              {data?.class?.name}
            </TextLink>
          }
        />
      </Card>
    </Flex>
  )
}

export default Topics
