import React from 'react'
import { Box } from '@fxtrot/ui'
import { useRouter } from 'next/router'
import { useClassId, useTopicId } from '../../../utils'

import { NewTopic } from './NewTopic'
import { TopicsList } from './TopicList'
import { TopicLink } from './TopicLink'
import { useClassTopics } from '../gql'

const Topics = () => {
  const router = useRouter()

  const selectedTopicId = useTopicId()
  const classId = useClassId()
  const { loading, data } = useClassTopics()

  if (loading || !data) {
    return null
  }

  function openTopic(id: string) {
    router.push(`/${classId}/topic/${id}`)
  }

  const topics = data.class.topics.edges

  return (
    <Box height="100%" overflow="hidden" pb="$2" display="grid" gridTemplateRows="auto 1fr">
      <NewTopic />
      <TopicsList>
        {topics.map(({ node }, index) => (
          <TopicLink key={node.id} selected={selectedTopicId === node.id} onClick={openTopic} {...node} index={index} />
        ))}
      </TopicsList>
    </Box>
  )
}

export default Topics
