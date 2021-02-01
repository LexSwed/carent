import React, { useState } from 'react'
import { Box, Grid, Heading } from '@fxtrot/ui'

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
          {assignments?.edges.length > 0 ? (
            <>
              <Heading level={3}>{topic ? `Assignments for ${topic.title}` : 'All class assignments'}</Heading>
              <List edges={assignments.edges} />
            </>
          ) : loading ? null : (
            <>
              <Heading level={3}>Class assignments</Heading>
              <CreateNewAssignment selectedTopic={selectedTopicId} />
            </>
          )}
        </Box>
      </Grid>
    </Card>
  )
}

export default Assignments
