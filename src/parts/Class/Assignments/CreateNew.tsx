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
    <>
      <Heading level={3}>New assignment</Heading>
      <Flex main="center" cross="center">
        <Box pt="$10" width={260} zIndex={10}>
          <Flex space="$4">
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
        </Box>
        <ImageWrapper>
          <Image src="/draw/post.svg" height={300} width="auto" />
        </ImageWrapper>
      </Flex>
    </>
  )
}

const ImageWrapper = styled('div', {
  opacity: 0.4,
  mt: '-50px',
})
