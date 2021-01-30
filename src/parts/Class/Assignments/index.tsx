import React, { useState } from 'react'
import { Flex, Grid } from '@fxtrot/ui'

import { Card } from '../../Card'
import TopicList from '../../TopicList'

const Assignments = () => {
  const [selectedTopicId, selectTopicId] = useState('')
  return (
    <Card>
      <Grid gap="$4" columns="minmax(200px, 1fr) 2fr">
        <TopicList selectedId={selectedTopicId} onSelect={selectTopicId} />
      </Grid>
    </Card>
  )
}

export default Assignments
