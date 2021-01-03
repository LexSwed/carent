import React from 'react'
import { Box, Flex, Grid, StyleRecord } from '@fxtrot/ui'

import Topics from './Topics'
import ClassHeader from './Header'
import Topic from './Topic'

const styles: StyleRecord = {
  fill: {
    height: '-webkit-fill-available',
    overflow: 'hidden',
  },
  max: {
    maxHeight: '100%',
    overflow: 'hidden',
  },
  main: {
    p: '$4',
    pb: 0,
    bc: 'rgba(255,255,255,0.9)',
    shadow: '-5px 10px 25px -5px rgba(0, 0, 0, 0.03), -5px 5px 10px -5px rgba(0, 0, 0, 0.01)',
    maxHeight: '100%',
    overflow: 'hidden',
  },
}

const ClassPage = () => {
  return (
    <Box as="main" css={styles.main}>
      <Flex space="$4" css={styles.max}>
        <ClassHeader />
        <Box py="$2">Tabs</Box>
        <Grid columns="300px 1fr" css={styles.fill}>
          <Topics />
          <Topic />
        </Grid>
      </Flex>
    </Box>
  )
}

export default ClassPage
