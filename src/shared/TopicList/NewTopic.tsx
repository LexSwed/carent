import React, { useState } from 'react'
import { Box, TextField, VisuallyHidden } from '@fxtrot/ui'

import { useCreateNewTopic } from '../../parts/Class/gql'
import { useClassId } from '../../utils'

export const NewTopic: React.FC = () => {
  const classId = useClassId()
  const [create] = useCreateNewTopic()
  const [title, setTitle] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
