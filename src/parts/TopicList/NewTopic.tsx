import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, TextField, VisuallyHidden } from '@fxtrot/ui'

import { useCreateNewTopic } from '../Class/gql'
import { useClassId } from '../../utils'

export const NewTopic: React.FC = () => {
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
    <Box pl="$4" as="form" onSubmit={handleSubmit}>
      <TextField
        placeholder="1.2 Exploration of Magic"
        hint="press Enter ↵ to create new topic"
        variant="transparent"
        autoComplete="off"
        value={title}
        onChange={setTitle}
      />
      <VisuallyHidden>
        <button type="submit">Submit new topic</button>
      </VisuallyHidden>
    </Box>
  )
}
