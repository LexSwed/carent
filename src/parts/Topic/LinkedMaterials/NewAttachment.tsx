import React, { useEffect, useState } from 'react'

import { Box, Button, Flex, Icon, TextField } from '@fxtrot/ui'
import { HiDocumentAdd, HiOutlineDocumentAdd, HiViewGridAdd } from 'react-icons/hi'
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
    <Flex space="$4" flow="row-reverse" as="form" onSubmit={handleSubmit}>
      <TextField
        aria-label="Insert link to the resource"
        hint="Insert a URL of the resource to attach to this topic"
        value={value}
        placeholder="Links like https://google.com"
        onChange={onChange}
        validity={valid ? 'valid' : undefined}
        type="url"
        variant="transparent"
      />
      <Box pt="$1">
        <Button size="sm" aria-label="Link the resource" variant="flat" type="submit" main="center">
          <Icon as={HiOutlineDocumentAdd} size="lg" />
        </Button>
      </Box>
    </Flex>
  )
}

export default NewAttachment
