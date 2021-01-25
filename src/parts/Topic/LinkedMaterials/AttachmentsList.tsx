import React from 'react'
import { Flex, TextLink, styled, TextField } from '@fxtrot/ui'
import { useScraper } from '../../../utils/link-preview'
import { useTopicAttachments, useRenameTopicAttachment } from '../gql'
import type { GetTopicAttachmentsQuery } from '../../../graphql/generated'

const AttachmentsList = () => {
  const { data } = useTopicAttachments()
  const list = data?.topic?.attachments?.edges || []
  return (
    <Flex space="$2">
      {list.map((edge) => (
        <LinkPreview key={edge.node.id} {...edge.node} />
      ))}
    </Flex>
  )
}

export default AttachmentsList

const LinkPreview: React.FC<GetTopicAttachmentsQuery['topic']['attachments']['edges'][number]['node']> = ({
  id,
  href,
  name,
}) => {
  const { data } = useScraper({ url: href })
  const [rename] = useRenameTopicAttachment()

  async function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const newName = e.currentTarget.value?.trim()
    if (newName !== name) {
      await rename({
        variables: {
          id,
          name: newName,
        },
      })
    }
  }

  return (
    <LinkPreviewBox>
      <Flex flow="row" cross="center">
        {data?.image && <PreviewImage src={data.image.src} rel={data.image.rel} />}
        <LinkDetails>
          <TextField variant="transparent" defaultValue={name} onBlur={handleBlur} />
          {data?.url && (
            <TextLink href={data.url} size="xs" external="icon" ellipsis>
              {data.url}
            </TextLink>
          )}
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
  pl: '$4',
  minWidth: 0,
})

const PreviewImage = styled('img', {
  height: 80,
  width: 80,
  objectFit: 'cover',
  bc: '$surfaceHover',

  variants: {
    rel: {
      icon: {
        p: '$3',
      },
      preview: {},
    },
  },

  [`& + ${LinkDetails}`]: {
    borderLeft: '1px solid $borderLight',
  },
})
