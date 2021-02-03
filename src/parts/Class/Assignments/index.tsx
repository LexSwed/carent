import React, { useRef, useState } from 'react'
import { Box, Flex, Grid, Text, Heading, Popover } from '@fxtrot/ui'
import Image from 'next/image'

import { Card } from '../../Card'
import TopicList from '../../TopicList'
import { useClassId } from '../../../utils'
import { useClassAssignments, useTopicTitle } from '../gql'
import { CreateNewAssignment } from './CreateNew'
import List from './List'

const Assignments = () => {
  const classId = useClassId()
  const [selectedTopicId, selectTopicId] = useState<string>()
  const { data: { topic } = {} } = useTopicTitle(selectedTopicId)
  const { data: { assignments } = {}, loading } = useClassAssignments(classId, selectedTopicId)
  console.log(selectedTopicId)
  return (
    <Card>
      <Grid gap="$4" columns="minmax(200px, 1fr) 2fr">
        <Box>
          <TopicList
            label={<Heading level={3}>Topics</Heading>}
            selectedId={selectedTopicId}
            onSelect={(id) => selectTopicId((selected) => (selected === id ? undefined : id))}
          />
        </Box>
        <Box>
          {loading ? null : assignments?.edges.length > 0 ? (
            <AssignmentsList selectedTopicId={selectedTopicId} topic={topic} edges={assignments?.edges} />
          ) : (
            <NoAssignments selectedTopicId={selectedTopicId} />
          )}
        </Box>
      </Grid>
    </Card>
  )
}

export default Assignments

interface ListProps {
  selectedTopicId: string
  topic: GetTopicTitleQuery['topic']
  edges: GetAssignmentsQuery['assignments']['edges']
}
const AssignmentsList: React.FC<ListProps> = ({ selectedTopicId, topic, edges }) => {
  const ref = useRef(null)
  console.log(selectedTopicId)
  return (
    <Flex space="$4">
      <Flex flow="row" main="spread" cross="center">
        <Heading level={3}>{topic ? `Assignments for ${topic.title}` : 'All class assignments'}</Heading>
        <Popover ref={ref}>
          <Popover.Trigger size="sm" variant="primary">
            Create
          </Popover.Trigger>
          <Popover.Content css={{ width: 300 }}>
            <CreateNewAssignment selectedTopic={selectedTopicId} onCreate={() => ref.current?.close()} />
          </Popover.Content>
        </Popover>
      </Flex>
      <List edges={edges} />
    </Flex>
  )
}

const NoAssignments: React.FC<{ selectedTopicId: string }> = ({ selectedTopicId }) => {
  return (
    <Flex space="$4">
      <Flex flow="row" cross="center">
        <Heading level={3}>Class assignments</Heading>
        <Box height={32} width={32} />
      </Flex>
      <Grid columns="10fr 9fr" gap="$8">
        <Flex space="$4">
          <Text size="sm" tone="light">
            You don't have any assignments in here yet, so... Let's create a new one!
          </Text>
          <CreateNewAssignment selectedTopic={selectedTopicId} />
        </Flex>
        <Image src="/draw/post.svg" height="auto" width={200} />
      </Grid>
    </Flex>
  )
}
