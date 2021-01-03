import React, { useState } from 'react'
import { Box, Button, Flex, Icon, styled, TextField, useKeyboardHandles } from '@fxtrot/ui'
import { HiPlus } from 'react-icons/hi'
import { useClassId } from '../../../utils'

import { useCreateNewTopic } from './gql'

const MainCard = styled('div', {
  py: '$4',
  position: 'sticky',
  top: 0,
  bc: '$surfaceStill',
  zIndex: 10,
  shadow: '$sm',
  clipPath: 'inset(0 0 -5px 0)',
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
