import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Box, Button, Flex, Icon, styled, TextField, useKeyboardHandles } from '@fxtrot/ui'
import { HiPlus } from 'react-icons/hi'
import type { CreateNewTopicMutation, CreateNewTopicMutationVariables } from '../../graphql/generated'
import { useClassId } from '../../utils'

const createNewTopic = gql`
  mutation createNewTopic($classId: String!, $title: String!) {
    createTopic(classId: $classId, title: $title) {
      id
      title
    }
  }
`

const MainCard = styled('div', {
  py: '$4',
  position: 'sticky',
  top: 0,
  bc: '$surfaceStill',
  zIndex: 10,
  shadow: '$sm',
  clipPath: 'inset(0 0 -5px 0)',
})

const NewTopicCard = () => {
  const classId = useClassId()
  const [create] = useCreateNewTopic()
  const [title, setTitle] = useState('')

  const handleKeyDown = useKeyboardHandles({
    Enter: async () => {
      const newTitle = title.trim()
      if (newTitle !== '') {
        await create({
          variables: {
            classId,
            title: title.trim(),
          },
        })
        setTitle('')
      }
    },
  })

  return (
    <MainCard>
      <Flex flow="row-reverse">
        <TextField
          placeholder="New topic title..."
          hint="press Enter ↵ to create"
          variant="underlined"
          autoComplete="off"
          value={title}
          onChange={setTitle}
          onKeyDown={handleKeyDown}
        />
        <Box pl="$2" pt="$1">
          <Button size="sm" variant="flat" aria-label="Create new topic">
            <Icon size="sm" as={HiPlus} />
          </Button>
        </Box>
      </Flex>
    </MainCard>
  )
}
export default NewTopicCard

const useCreateNewTopic = () => {
  const classId = useClassId()

  return useMutation<CreateNewTopicMutation, CreateNewTopicMutationVariables>(createNewTopic, {
    update(cache, { data: { createTopic: item } }) {
      cache.modify({
        id: cache.identify({
          __typename: 'Class',
          id: classId,
        }),
        fields: {
          topics(existingTopics = {}) {
            return {
              ...existingTopics,
              edges: [
                {
                  __typename: 'TopicEdge',
                  node: item,
                },
                ...existingTopics.edges,
              ],
            }
          },
        },
      })
    },
  })
}
