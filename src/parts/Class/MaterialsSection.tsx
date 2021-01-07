import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import { Box, Button, Flex, Heading, Icon, Text, TextField } from '@fxtrot/ui'
import {
  GetLastUpdatedTopicQuery,
  GetLastUpdatedTopicQueryVariables,
  TopicSortKey,
  TopicSortOrder,
} from '../../graphql/generated'
import { useClassId } from '../../utils'
import { HiChevronRight, HiArrowRight } from 'react-icons/hi'
import { useRouter } from 'next/router'
import { useCreateNewTopic } from './gql'

const MaterialsSection = () => {
  const classId = useClassId()
  const { data, loading } = useLastUpdatedTopic()

  const topic = data?.class?.topics?.edges?.[0]?.node

  return (
    <Flex as="section" space="$2">
      <Box>
        <Link href={`/${classId}/materials`}>
          <Button as="a" variant="flat">
            <Text size="xl">Materials</Text>
            <Icon as={HiChevronRight} size="xl" />
          </Button>
        </Link>
      </Box>
      {!loading && (
        <Flex space="$4">
          {topic ? <LatestTopic topic={topic} /> : <NoMaterials />}
          <Flex>
            <Text tone="light" size="sm">
              Create new materials
            </Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default MaterialsSection

const getLastUpdatedTopic = gql`
  query getLastUpdatedTopic($classId: String!, $sortOrder: ClassTopicsSortOrder!) {
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
  return (
    <Box bc="$primaryLightActive" br="$md" px="$4" pt="$4" pb="$6">
      <Flex space="$4">
        <Text css={{ color: '$primaryStill', opacity: 0.8 }} size="sm">
          Continue your work on
        </Text>
        <Flex flow="row" main="start" cross="center" space="$4">
          <Icon as={TopicIcon} size="xl" stroke="$primaryStill" />
          <Box py="$4" borderRight="2px solid $primaryStill" />
          <Heading level={3} css={{ color: '$primaryStill' }}>
            {topic.title}
          </Heading>
          <Box ml="auto">
            <Link href={`/${classId}/materials/${topic.id}`}>
              <Button variant="primary" as="a">
                <Icon as={HiArrowRight} size="lg" />
              </Button>
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Box>
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
  const [create] = useCreateNewTopic()
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
    <Box bc="$primaryLightActive" br="$md" p="$6">
      <Flex space="$4" as="form" onSubmit={handleSubmit}>
        <Flex space="$2">
          <Heading>New start</Heading>
          <Text tone="light">Create a new topic as a first teaching material for this class</Text>
        </Flex>
        <Box ml="-$3">
          <TextField
            name="topic-name"
            placeholder="New topic title..."
            hint="For example, Linear Equations or 1.2 Chain reactions"
            variant="inline"
            autoComplete="off"
            css={{ '& input': { textSize: '$lg' } }}
          />
        </Box>
        <Flex flow="row" main="end">
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Flex>
      </Flex>
    </Box>
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
