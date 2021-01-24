import React, { useEffect, useState } from 'react'

import { Flex, Heading, Text, TextLink } from '@fxtrot/ui'
import NewAttachment from './NewAttachment'
import AttachmentsList from './AttachmentsList'
import { useTopicAttachments } from '../gql'

const LinkedMaterials = () => {
  const { data, loading } = useTopicAttachments()
  const [isNewLinkShown, setNewLinkShown] = useState(false)

  const thereAreAttachments = data?.topic?.attachments?.edges?.length > 0

  useEffect(() => {
    setNewLinkShown(!thereAreAttachments)
  }, [thereAreAttachments])
  console.log(data?.topic?.attachments?.edges)
  return (
    <Flex space="$8">
      <Heading level={3}>Linked Materials</Heading>
      {!loading && (
        <>
          {isNewLinkShown && <NewAttachment />}
          {thereAreAttachments && <AttachmentsList />}
          <Text tone="light" size="xs" align="justify" as="p">
            Link any materials relevant to the topic, for example books to download or your personal files from{' '}
            <TextLink size="xs" display="inline" href="https://www.youtube.com/" external>
              YouTube
            </TextLink>
            ,{' '}
            <TextLink size="xs" display="inline" href="https://www.notion.so/" external>
              Notion
            </TextLink>
            ,{' '}
            <TextLink size="xs" display="inline" href="https://docs.google.com/" external>
              Google Docs
            </TextLink>
            , or{' '}
            <TextLink size="xs" display="inline" href="https://drive.google.com/" external>
              Google Drive
            </TextLink>
          </Text>
        </>
      )}
    </Flex>
  )
}

export default LinkedMaterials
