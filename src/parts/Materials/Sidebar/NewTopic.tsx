import React, { useState } from 'react'
import { Box, Button, Flex, Icon, styled, TextField, useKeyboardHandles } from '@fxtrot/ui'
import { HiPlus } from 'react-icons/hi'
import { useClassId } from '../../../utils'

import { useCreateNewTopic } from '../../Class/gql'

const MainCard = styled('div', {
  py: '$4',
  px: '$2',
})

export const NewTopic = () => {
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
            title: newTitle,
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
          variant="inline"
          autoComplete="off"
          value={title}
          onChange={setTitle}
          onKeyDown={handleKeyDown}
        />
        <Box pt="$2" mr="-$1">
          <Button size="xs" variant="flat" aria-label="Create new topic">
            <Icon size="sm" as={HiPlus} />
          </Button>
        </Box>
      </Flex>
    </MainCard>
  )
}
