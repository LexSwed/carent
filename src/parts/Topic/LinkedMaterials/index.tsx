import React, { useEffect, useRef, useState } from 'react'

import { Box, Button, Flex, Heading, Icon, Text, TextLink } from '@fxtrot/ui'
import NewAttachment from './NewAttachment'
import AttachmentsList from './AttachmentsList'
import { useTopicAttachments } from '../gql'
import { EyeOffIcon, PlusIcon } from '@heroicons/react/outline'

const LinkedMaterials = () => {
  const { data, loading } = useTopicAttachments()
  const [isNewLinkShown, setNewLinkShown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const thereAreAttachments = data?.topic?.attachments?.edges?.length > 0

  useEffect(() => {
    setNewLinkShown(!thereAreAttachments)
  }, [thereAreAttachments])

  return (
    <Flex gap="4">
      <Flex flow="row" main="space-between" cross="center">
        <Heading level={3} css={{ py: '$1' }}>
          Linked Materials
        </Heading>
        {thereAreAttachments &&
          (isNewLinkShown ? (
            <Button aria-label="Hide new link form" size="sm" variant="flat" onClick={(e) => setNewLinkShown(false)}>
              <Icon as={EyeOffIcon} size="md" />
            </Button>
          ) : (
            <Button
              aria-label="Show new link form"
              size="sm"
              variant="flat"
              onClick={() => {
                setNewLinkShown(true)
                setTimeout(() => {
                  console.log(inputRef.current)
                  inputRef.current?.focus()
                }, 100)
              }}
            >
              <Icon as={PlusIcon} size="md" />
            </Button>
          ))}
      </Flex>
      <Box minHeight={200}>
        <Flex gap="4">
          {!loading && (
            <>
              {isNewLinkShown && <NewAttachment inputRef={inputRef} />}

              {thereAreAttachments && <AttachmentsList />}
            </>
          )}
        </Flex>
      </Box>
      <SectionDescription />
    </Flex>
  )
}

export default LinkedMaterials

const SectionDescription = () => {
  return (
    <Text tone="light" size="xs" align="justify" as="p">
      Link any materials relevant to the topic, for example books to download or your personal files from{' '}
      <TextLink size="xs" href="https://www.youtube.com/" external>
        YouTube
      </TextLink>
      ,{' '}
      <TextLink size="xs" href="https://www.notion.so/" external>
        Notion
      </TextLink>
      ,{' '}
      <TextLink size="xs" href="https://docs.google.com/" external>
        Google Docs
      </TextLink>
      , or{' '}
      <TextLink size="xs" href="https://drive.google.com/" external>
        Google Drive
      </TextLink>
    </Text>
  )
}
