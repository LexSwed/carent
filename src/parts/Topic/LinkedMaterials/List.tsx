import React from 'react'
import { Flex, TextLink, Text, styled } from '@fxtrot/ui'
import { useScraper } from '../../../utils/link-preview'
import type { LinkData } from '../../../utils/link-preview/scrapper/utils'
import { useTopicAttachments } from '../gql'

const List = () => {
  const { data } = useTopicAttachments()

  return <Flex>{JSON.stringify(data, null, 2)}</Flex>
}

export default List

function LinkPreview({ url, description, title, image }: LinkData) {
  return (
    <LinkPreviewBox>
      <Flex flow="row" cross="center">
        {image && <PreviewImage src={image.src} rel={image.rel} />}
        <LinkDetails>
          <Text as="div" size="sm" ellipsis>
            {title}
          </Text>
          <Text as="div" size="xs" ellipsis tone="light">
            {description}
          </Text>
          <TextLink href={url} size="xs" ellipsis external="icon">
            {url}
          </TextLink>
        </LinkDetails>
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

const LinkDetails = styled('div', {
  overflow: 'hidden',
  p: '$2',
  minWidth: 0,
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

  [`& + ${LinkDetails}`]: {
    borderLeft: '1px solid $borderLight',
  },
})
