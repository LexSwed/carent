import React from 'react'
import { Flex, Box, Heading, Grid } from '@fxtrot/ui'
import Image from 'next/image'

import ClassHeader from './Header'
import { Card } from '../Card'
import TopicList from '../TopicList'

import { useClassId } from '../../utils'
import Assignments from '../Assignments'

const ClassPage = () => {
  const classId = useClassId()

  if (!classId) {
    return (
      <Box maxWidth={800} py="20vh">
        <Flex cross="center">
          <Image src="/draw/post.svg" width="auto" height={200} />
        </Flex>
      </Box>
    )
  }

  return (
    <Box maxWidth={900}>
      <Flex space="$8">
        <ClassHeader />
        <Flex space="$8">
          <Card>
            <Grid gap="$4" columns="minmax(200px, 1fr) 2fr">
              <Box>
                <TopicList title={<Heading level={3}>Topics</Heading>} />
              </Box>
              <Box>
                <Assignments />
              </Box>
            </Grid>
          </Card>
        </Flex>
      </Flex>
    </Box>
  )
}

export default ClassPage
