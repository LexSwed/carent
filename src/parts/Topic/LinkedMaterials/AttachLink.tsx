import React, { useState } from 'react'

import { Box, Flex, styled, Text, TextField, TextLink } from '@fxtrot/ui'
import { useScraper } from '../../../utils/link-preview'
import type { LinkData } from '../../../utils/link-preview/scrapper/utils'

const AttachLink = () => {
  const [url, setUrl] = useState('')
  const { data, loading, error } = useScraper({
    url,
  })

  return (
    <Flex space="$4">
      <TextField
        label="Insert link to the resource"
        hint="URL of the resource to attach to this topic"
        value={url}
        onChange={setUrl}
        validity={!loading ? (data ? 'valid' : error ? 'invalid' : undefined) : undefined}
      />
      {data ? <LinkPreview {...data} /> : undefined}
    </Flex>
  )
}

export default AttachLink

function LinkPreview({ url, description, title, image }: LinkData) {
  return (
    <LinkPreviewBox>
      <Flex flow="row" cross="center">
        <PreviewImage src={image.src} rel={image.rel} />
        <Box overflow="hidden" p="$2" minWidth={0} borderLeft="1px solid $borderLight">
          <Text as="div" size="sm" ellipsis>
            {title}
          </Text>
          <Text as="div" size="xs" ellipsis tone="light">
            {description}
          </Text>
          <TextLink href={url} external>
            <Text size="xs" ellipsis>
              {url}
            </Text>
          </TextLink>
        </Box>
      </Flex>
    </LinkPreviewBox>
  )
}

const LinkPreviewBox = styled('div', {
  textDecoration: 'none',
  color: '$text',
  border: '1px solid $borderLight',
  br: '$md',
  maxHeight: 80,
  overflow: 'hidden',
})

const PreviewImage = styled('img', {
  height: 80,
  minWidth: 80,
  objectFit: 'cover',

  variants: {
    rel: {
      icon: {
        p: '$3',
        width: 80,
      },
      preview: {
        minWidth: 'auto',
        maxWidth: 100,
      },
    },
  },
})
