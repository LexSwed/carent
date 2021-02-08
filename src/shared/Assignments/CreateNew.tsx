import React, { useEffect, useState } from 'react'
import { Button, Flex, Picker, TextField } from '@fxtrot/ui'
import { useClassTopics } from '../../parts/Topic/gql'
import { useCreateAssignment } from '../../parts/Class/gql'

interface Props {
  selectedTopic?: string
  onCreate?: () => void
}
export const CreateNewAssignment: React.FC<Props> = ({ selectedTopic, onCreate }) => {
  const [topicId, setTopicId] = useState(selectedTopic)
  const [title, setTitle] = useState('')
  const [create, { loading }] = useCreateAssignment()
  const { data } = useClassTopics()

  useEffect(() => {
    setTopicId(selectedTopic)
  }, [selectedTopic])

  async function handleSubmit() {
    if (!topicId || !title) {
      return
    }
    await create({
      variables: {
        topicId,
        title,
      },
    })
    onCreate?.()
  }

  return (
    <Flex space="$4">
      <TextField label="Assignment title" placeholder="Control test" value={title} onChange={setTitle} required />
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
  )
}
