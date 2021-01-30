import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Heading, Picker, styled, TextField } from '@fxtrot/ui'
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
    <Flex flow="row-reverse" main="spread" cross="center">
      <ImageWrapper>
        <Image src="/draw/post.svg" height={300} width="auto" />
      </ImageWrapper>
      <Box width={280}>
        <Flex space="$4">
          <Heading level={3}>New assignment</Heading>
          <TextField label="Assignment name" placeholder="Control test" value={name} onChange={setName} required />
          <Picker name="topic" value={topicId} onChange={setTopicId} label="The topic it covers">
            {data?.class?.topics?.edges.map((edge) => (
              <Picker.Item key={edge.node.id} label={edge.node.title} value={edge.node.id} />
            ))}
          </Picker>
          <Button disabled={loading} variant="primary" main="center" onClick={handleSubmit} css={{ width: '100%' }}>
            <span>Create assignment</span>
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}

const ImageWrapper = styled('div', {
  ml: '-$8',
  opacity: 0.7,
})
