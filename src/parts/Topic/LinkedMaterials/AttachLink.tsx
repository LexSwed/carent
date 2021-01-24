import React, { useEffect, useState } from 'react'

import { Button, Flex, Icon, TextField } from '@fxtrot/ui'
import { HiViewGridAdd } from 'react-icons/hi'
import { isUrl } from '../../../utils/link-preview'

const AttachLink = () => {
  const [url, setUrl] = useState('')
  const [valid, setValid] = useState(false)

  useEffect(() => {
    setValid(url && isUrl(url))
  }, [url])

  return (
    <Flex space="$4" as="form" onSubmit={(e) => e.preventDefault()}>
      <TextField
        label="Insert link to the resource"
        hint="URL of the resource to attach to this topic"
        value={url}
        onChange={setUrl}
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

export default AttachLink
