import React from 'react'
import { Box, Flex, Grid, Text, Heading } from '@fxtrot/ui'
import Image from 'next/image'

import { CreateNewAssignment } from './CreateNew'

const NoAssignments: React.FC<{ topicId: string }> = ({ topicId }) => {
  return (
    <Flex gap="4">
      <Flex flow="row" cross="center">
        <Heading level={3}>Class assignments</Heading>
        <Box height={32} width={32} />
      </Flex>
      <Grid columns="10fr 9fr" gap="8">
        <Flex gap="4">
          <Text size="sm" tone="light">
            You don't have any assignments in here yet, so... Let's create a new one!
          </Text>
          <CreateNewAssignment selectedTopic={topicId} />
        </Flex>
        <Image src="/draw/post.svg" height="auto" width={200} />
      </Grid>
    </Flex>
  )
}

export default NoAssignments
