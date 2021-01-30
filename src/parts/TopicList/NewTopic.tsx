import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Flex, Icon, TextField } from '@fxtrot/ui'
import { HiPlus } from 'react-icons/hi'

import { useCreateNewTopic } from '../Class/gql'
import { useClassId } from '../../utils'

export const NewTopic = () => {
  const classId = useClassId()
  const router = useRouter()
  const [create] = useCreateNewTopic()
  const [title, setTitle] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newTitle = title.trim()
    if (newTitle !== '') {
      const { data } = await create({
        variables: {
          classId,
          title: newTitle,
        },
      })
      setTitle('')
      router.push(`/${classId}/materials/${data?.createTopic?.id}`)
    }
  }

  return (
    <Flex flow="row-reverse" space="$4" as="form" onSubmit={handleSubmit}>
      <TextField
        placeholder="New topic title..."
        hint="press Enter ↵ to create"
        variant="transparent"
        autoComplete="off"
        value={title}
        onChange={setTitle}
      />
      <Box pt="$2">
        <Button type="submit" size="xs" variant="flat" aria-label="Create new topic">
          <Icon size="sm" as={HiPlus} />
        </Button>
      </Box>
    </Flex>
  )
}
