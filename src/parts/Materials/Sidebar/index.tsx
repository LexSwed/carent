import React from 'react'
import { Box, Flex } from '@fxtrot/ui'
import { useRouter } from 'next/router'
import { useClassId, useTopicId } from '../../../utils'

import { NewTopic } from './NewTopic'
import { TopicsList } from './TopicList'
import { TopicLink } from './TopicLink'
import { useClassTopics } from '../../Class/gql'
import UserPanel from '../../Class/Sidebar/UserPanel'

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
    <Box pl="$2" pr="$2">
      <Flex space="$4">
        <UserPanel />
        <Flex>
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
      </Flex>
    </Box>
  )
}

export default Topics
