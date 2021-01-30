import React, { useState } from 'react'
import { Box, Flex, Grid, Heading } from '@fxtrot/ui'
import Image from 'next/image'

import { Card } from '../../Card'
import TopicList from '../../TopicList'
import { useClassId } from '../../../utils'
import { useClassAssignments, useTopicTitle } from '../gql'
import { CreateNewAssignment } from './CreateNew'

const Assignments = () => {
  const classId = useClassId()
  const [selectedTopicId, selectTopicId] = useState<string>()
  const { data: { topic } = {} } = useTopicTitle(selectedTopicId)
  const { data: { assignments } = {} } = useClassAssignments(classId, selectedTopicId)
  return (
    <Card>
      <Grid gap="$4" columns="minmax(200px, 1fr) 2fr">
        <Box>
          <Heading level={3}>Topics</Heading>
          <TopicList
            selectedId={selectedTopicId}
            onSelect={(id) => selectTopicId((selected) => (selected === id ? null : id))}
          />
        </Box>
        <Box>
          {assignments?.edges.length > 0 ? (
            <>
              <Heading level={3}>{topic ? `Assignments for ${topic.title}` : 'All class assignments'}</Heading>
              <Flex space="$2">
                {assignments?.edges.map((edge) => {
                  return <div key={edge.node.id}>{edge.node.name}</div>
                })}
              </Flex>
            </>
          ) : (
            <CreateNewAssignment selectedTopic={selectedTopicId} />
          )}
        </Box>
      </Grid>
    </Card>
  )
}

export default Assignments
