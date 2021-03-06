import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import { Box, Button, Flex, Heading, Icon, Text, TextField, TextLink } from '@fxtrot/ui'

import { useClassId } from '../../utils'
import { ChevronRightIcon, ArrowRightIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useCreateNewTopic } from './gql'
import { Card } from '../../shared/Card'

const MaterialsSection = () => {
  const classId = useClassId()
  const { data, loading } = useLastUpdatedTopic()

  const topic = data?.class?.topics?.edges?.[0]?.node

  if (loading) {
    return null
  }

  return (
    <Card>
      <Flex as="section" gap="2">
        <Box>
          <Link href={`/${classId}/materials`}>
            <Button as="a" variant="flat" size="lg">
              <Text size="xl">Materials</Text>
              <Icon as={ChevronRightIcon} size="xl" />
            </Button>
          </Link>
        </Box>
        {!loading && (
          <Box px="$4" pb="$4">
            <Flex gap="4">{topic ? <LatestTopic topic={topic} /> : <NoMaterials />}</Flex>
          </Box>
        )}
      </Flex>
    </Card>
  )
}

export default MaterialsSection

const getLastUpdatedTopic = gql`
  query getLastUpdatedTopic($classId: ID!, $sortOrder: ClassTopicsSortOrder!) {
    class(id: $classId) {
      id
      topics(first: 1, sort: $sortOrder) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
`

function LatestTopic({
  topic,
}: {
  topic: ReturnType<typeof useLastUpdatedTopic>['data']['class']['topics']['edges'][number]['node']
}) {
  const classId = useClassId()
  const href = `/${classId}/materials/${topic.id}`
  return (
    <Flex gap="4">
      <Text css={{ color: '$primaryStill', opacity: 0.8 }} size="sm">
        Continue your work on
      </Text>
      <Flex flow="row" main="start" cross="center">
        <Link href={href}>
          <Flex as={TextLink} flow="row" main="start" cross="center" gap="4">
            <Icon as={TopicIcon} size="xl" stroke="$primaryStill" />
            <Box py="$4" borderRight="2px solid $primaryStill" />
            <Heading level={3} css={{ color: '$primaryStill', m: 0 }}>
              {topic.title}
            </Heading>
          </Flex>
        </Link>
        <Box ml="auto">
          <Link href={href}>
            <Button variant="primary" as="a">
              <Icon as={ArrowRightIcon} size="xl" />
            </Button>
          </Link>
        </Box>
      </Flex>
    </Flex>
  )
}

function useLastUpdatedTopic() {
  const classId = useClassId()
  return useQuery<GetLastUpdatedTopicQuery, GetLastUpdatedTopicQueryVariables>(getLastUpdatedTopic, {
    variables: {
      classId,
      sortOrder: {
        key: TopicSortKey.Updated,
        order: TopicSortOrder.Desc,
      },
    },
  })
}

function NoMaterials() {
  const classId = useClassId()
  const [create, { loading }] = useCreateNewTopic()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<any>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const newTitle = (form.get('topic-name') as string).trim()
    if (newTitle) {
      const { data } = await create({
        variables: {
          classId,
          title: newTitle,
        },
      })
      router.push(`/${classId}/materials/${data.createTopic.id}`)
    }
  }

  return (
    <Flex gap="6" as="form" onSubmit={handleSubmit}>
      <Flex gap="2">
        <Heading>New start</Heading>
        <Text tone="light">Create a new topic as a first teaching material for this class</Text>
      </Flex>
      <TextField
        name="topic-name"
        placeholder="New topic title..."
        hint="For example, Linear Equations or 1.2 Chain reactions"
        variant="underlined"
        autoComplete="off"
        css={{
          '& input': { textSize: '$lg' },
        }}
      />
      <Flex flow="row" main="end">
        <Button variant="primary" disabled={loading} type="submit">
          Create
        </Button>
      </Flex>
    </Flex>
  )
}

function TopicIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  )
}
