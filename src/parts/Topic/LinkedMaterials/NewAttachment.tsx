import React, { useEffect, useState } from 'react'

import { Box, Button, Flex, Icon, TextField } from '@fxtrot/ui'
import { DocumentAddIcon } from '@heroicons/react/outline'
import { isUrl } from '../../../utils/link-preview'
import { useAddTopicAttachment } from '../gql'

const NewAttachment: React.FC<{
  inputRef?: React.RefObject<HTMLInputElement>
}> = ({ inputRef }) => {
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
    <Flex gap="4" flow="row-reverse" as="form" onSubmit={handleSubmit}>
      <TextField
        aria-label="Insert link to the resource"
        hint="Insert a URL of the resource to attach to this topic"
        value={value}
        placeholder="For example, https://google.com"
        onChange={onChange}
        validity={valid ? 'valid' : undefined}
        type="url"
        variant="transparent"
        inputRef={inputRef}
      />
      <Box pt="$1">
        <Button size="sm" aria-label="Link the resource" variant="flat" type="submit" main="center">
          <Icon as={DocumentAddIcon} size="lg" />
        </Button>
      </Box>
    </Flex>
  )
}

export default NewAttachment
