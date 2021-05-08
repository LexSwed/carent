import React from 'react'
import { Flex, Grid } from '@fxtrot/ui'

import { useTopicId } from '../../utils'
import Header from './Header'
import Placeholder from './Placeholder'
import { Card } from '../../shared/Card'
import LinkedMaterials from './LinkedMaterials'
import Assignments from '../../shared/Assignments'

const Topic = () => {
  const topicId = useTopicId()

  if (!topicId) {
    return <Placeholder />
  }

  return (
    <Flex gap="4" key={topicId}>
      <Header />
      <Grid columns="minmax(320px, 3fr) [main] minmax(300px, 2fr) [materials]" gap="4" cross="start">
        <Card>
          <Assignments />
        </Card>
        <Card>
          <LinkedMaterials />
        </Card>
      </Grid>
    </Flex>
  )
}

export default Topic
