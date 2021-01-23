import React from 'react'
import { Flex } from '@fxtrot/ui'
import { useRouter } from 'next/router'
import { useClassId, useTopicId } from '../../../utils'

import { NewTopic } from './NewTopic'
import { TopicsList } from './TopicList'
import { TopicLink } from './TopicLink'
import { useClassTopics } from '../../Class/gql'
import UserPanel from '../../UserPanel'
import { Card } from '../../Card'

const Topics = () => {
  const router = useRouter()
  const selectedTopicId = useTopicId()
  const classId = useClassId()
  const { data } = useClassTopics()

  function openTopic(id: string) {
    router.push(`/${classId}/materials/${id}`)
  }

  const topics = data?.class.topics.edges || []

  return (
    <Flex space="$4">
      <UserPanel />
      <Card>
        <Flex space="$4">
          <NewTopic />
          <TopicsList>
            {topics.map(({ node }, index) => (
              <TopicLink
                key={node.id}
                selected={selectedTopicId === node.id}
                onClick={openTopic}
                {...node}
                index={index}
              />
            ))}
          </TopicsList>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Topics
