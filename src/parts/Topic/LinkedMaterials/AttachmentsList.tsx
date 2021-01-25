import React from 'react'
import { Flex, TextLink, styled, TextField, Icon } from '@fxtrot/ui'
import { useScraper } from '../../../utils/link-preview'
import { useTopicAttachments, useRenameTopicAttachment, useDeleteTopicAttachment } from '../gql'
import type { GetTopicAttachmentsQuery } from '../../../graphql/generated'
import { HiOutlineTrash } from 'react-icons/hi'

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
  const [remove] = useDeleteTopicAttachment(id)

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
        <PreviewImageBox>
          {data?.image && <PreviewImage src={data.image.src} rel={data.image.rel} />}

          <LinkPreviewDelete onClick={() => remove()}>
            <Icon as={HiOutlineTrash} color="white" size="xl" />
          </LinkPreviewDelete>
        </PreviewImageBox>
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
  size: '80px',
  objectFit: 'cover',
  gridArea: '1 / 1',

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

const PreviewImageBox = styled('div', {
  position: 'relative',
  size: '80px',
  bc: '$surfaceHover',
  display: 'grid',
  placeItems: 'center',
})

const LinkPreviewDelete = styled('button', {
  'p': 0,
  'border': 'none',
  'size': '100%',
  'cursor': 'pointer',
  'display': 'grid',
  'placeItems': 'center',
  'bc': 'rgba(30, 20, 50, 0.6)',
  'opacity': 0,
  'transition': 'opacity 0.24s ease-in-out',
  'gridArea': '1 / 1',
  'zIndex': 10,
  'outline': 'none',

  '&:hover, &:focus': {
    opacity: 1,
  },
})
