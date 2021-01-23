import React from 'react'
import { Flex, Grid, Heading } from '@fxtrot/ui'

import { useTopicId } from '../../utils'
import Header from './Header'
import Placeholder from './Placeholder'
import { Card } from '../Card'
import LinkedMaterials from './LinkedMaterials'

const Topic = () => {
  const topicId = useTopicId()

  if (!topicId) {
    return <Placeholder />
  }

  return (
    <Flex space="$4">
      <Header />
      <Grid
        columns="minmax(320px, 3fr) [main] minmax(300px, 2fr) [materials]"
        gap="$4"
        css={{ alignItems: 'flex-start' }}
      >
        <Card>
          <Flex space="$8">
            <Heading level={3}>Assignments</Heading>
          </Flex>
        </Card>
        <Card>
          <LinkedMaterials />
        </Card>
      </Grid>
    </Flex>
  )
}

export default Topic
