import React from 'react'
import { Flex } from '@fxtrot/ui'

import { NewTopic } from './NewTopic'
import { Topics } from './Topics'
import { TopicItem } from './TopicItem'
import { useClassTopics } from './gql'

const TopicList: React.FC<Props> = ({ selectedId, onSelect }) => {
  const { data } = useClassTopics()

  const topics = data?.class.topics.edges || []

  return (
    <Flex space="$4">
      <NewTopic />
      <Topics>
        {topics.map(({ node }, index) => (
          <TopicItem key={node.id} selected={selectedId === node.id} onClick={onSelect} {...node} index={index} />
        ))}
      </Topics>
    </Flex>
  )
}

export default TopicList

interface Props {
  selectedId: string
  onSelect: (id: string) => void
}
