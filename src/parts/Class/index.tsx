import React from 'react'
import { Flex, Grid, StyleRecord } from '@fxtrot/ui'

import ClassHeader from './Header'
import MaterialsSection from './MaterialsSection'

const styles: StyleRecord = {
  fill: {
    height: '-webkit-fill-available',
    overflow: 'hidden',
  },
  max: {
    maxHeight: '100%',
    overflow: 'hidden',
  },
}

const ClassPage = () => {
  return (
    <Flex space="$12" css={styles.max}>
      <ClassHeader />
      <Grid columns="5fr 3fr">
        <Flex space="$8">
          <MaterialsSection />
        </Flex>
        <Flex>Updates feed</Flex>
      </Grid>
    </Flex>
  )
}

export default ClassPage
