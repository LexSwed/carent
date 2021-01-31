import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Grid, Heading, Picker, Text, TextField } from '@fxtrot/ui'
import Image from 'next/image'
import { useClassTopics } from '../../Topic/gql'
import { useCreateAssignment } from '../gql'

export const CreateNewAssignment: React.FC<{ selectedTopic?: string }> = ({ selectedTopic }) => {
  const [topicId, setTopicId] = useState(selectedTopic)
  const [name, setName] = useState('')
  const [create, { loading }] = useCreateAssignment()
  const { data } = useClassTopics()

  useEffect(() => {
    setTopicId(selectedTopic)
  }, [selectedTopic])

  async function handleSubmit() {
    if (!topicId || !name) {
      return
    }
    await create({
      variables: {
        topicId,
        name,
      },
    })
  }

  return (
    <Grid columns="10fr 9fr" gap="$8">
      <Flex space="$4">
        <Text size="sm" tone="light">
          You don't have any assignments in here yet, so... Let's create a new one!
        </Text>
        <TextField label="Assignment name" placeholder="Control test" value={name} onChange={setName} required />
        <Picker
          name="topic"
          value={topicId}
          onChange={setTopicId}
          label="The topic it covers"
          placeholder="Select the topic"
        >
          {data?.class?.topics?.edges.map((edge) => (
            <Picker.Item key={edge.node.id} label={edge.node.title} value={edge.node.id} />
          ))}
        </Picker>
        <Button disabled={loading} variant="primary" main="center" onClick={handleSubmit} css={{ width: '100%' }}>
          <span>Create assignment</span>
        </Button>
      </Flex>
      <Image src="/draw/post.svg" height="auto" width={200} />
    </Grid>
  )
}
