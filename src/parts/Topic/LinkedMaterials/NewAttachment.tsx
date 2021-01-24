import React, { useEffect, useState } from 'react'

import { Button, Flex, Icon, TextField } from '@fxtrot/ui'
import { HiViewGridAdd } from 'react-icons/hi'
import { isUrl } from '../../../utils/link-preview'
import { useAddTopicAttachment } from '../gql'

const NewAttachment = () => {
  const [{ value, onChange }, [createLink]] = useAddTopicAttachment()
  const [valid, setValid] = useState(false)

  useEffect(() => {
    setValid(value && isUrl(value))
  }, [value])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await createLink()
  }

  return (
    <Flex space="$4" as="form" onSubmit={handleSubmit}>
      <TextField
        label="Insert link to the resource"
        hint="URL of the resource to attach to this topic"
        value={value}
        onChange={onChange}
        validity={valid ? 'valid' : undefined}
        type="url"
      />
      <Button variant="primary" type="submit" main="center">
        <Icon as={HiViewGridAdd} size="xl" />
        Link the resource
      </Button>
    </Flex>
  )
}

export default NewAttachment
