import React, { useState } from 'react'
import { Flex, Grid } from '@fxtrot/ui'

import { Card } from '../../Card'
import TopicList from '../../TopicList'
import { useClassId } from '../../../utils'
import { useClassAssignments } from '../gql'

const Assignments = () => {
  const classId = useClassId()
  const [selectedTopicId, selectTopicId] = useState<string>()
  const { data } = useClassAssignments(classId, selectedTopicId)
  return (
    <Card>
      <Grid gap="$4" columns="minmax(200px, 1fr) 2fr">
        <TopicList
          selectedId={selectedTopicId}
          onSelect={(id) => selectTopicId((selected) => (selected === id ? null : id))}
        />
      </Grid>
      <Flex space="$2">
        {data?.assignments?.edges.map((edge) => {
          return <div key={edge.node.id}>{edge.node.name}</div>
        })}
      </Flex>
    </Card>
  )
}

export default Assignments
