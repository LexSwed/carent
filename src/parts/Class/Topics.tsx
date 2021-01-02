import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Button, Flex, Icon, styled, Text } from '@fxtrot/ui'
import { HiChevronRight, HiMenuAlt4 } from 'react-icons/hi'
import { useRouter } from 'next/router'
import type { GetClassTopicsQuery, GetClassTopicsQueryVariables } from '../../graphql/generated'
import { useClassId, useTopicId } from '../../utils'

import NewTopicCard from './NewTopic'

const getTopics = gql`
  query getClassTopics($classId: String!) {
    class(id: $classId) {
      id
      topics(first: 30) {
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

const TopicsList = styled(Flex, {
  padding: 0,
  margin: 0,
  overflow: 'overlay',
  maxHeight: '-webkit-fill-available',
  pr: '$3',
})

const ReorderButton = styled(Button, {})

const TopicCard = styled(Flex, {
  'py': '$4',
  'px': '$2',
  'br': '$md',
  'bc': '$surfaceStill',
  'transition': '0.2s ease-in',

  '&:not(:first-child:not(:last-child))': {
    'position': 'relative',

    '&:before': {
      position: 'absolute',
      content: '""',
      bottom: 0,
      left: 0,
      width: '80%',
      height: '1px',
      bc: '$borderLight',
    },
  },

  [`& ${ReorderButton}`]: {
    opacity: 0,
  },
  [`&:hover ${ReorderButton}`]: {
    opacity: 1,
  },

  'variants': {
    selected: {
      true: {
        bc: '$surfaceActive',
      },
    },
  },
})

const Topics = () => {
  const router = useRouter()
  const classId = useClassId()
  const selectedTopicId = useTopicId()
  const { loading, data } = useQuery<GetClassTopicsQuery, GetClassTopicsQueryVariables>(getTopics, {
    variables: {
      classId,
    },
  })

  if (loading || !data) {
    return null
  }

  function openTopic(id: string) {
    router.push(`/${classId}/topic/${id}`)
  }

  return (
    <TopicsList as="ul">
      <NewTopicCard />
      {data.class.topics.edges.map(({ node }) => (
        <TopicCard
          as="li"
          key={node.id}
          selected={selectedTopicId === node.id}
          flow="row"
          cross="center"
          main="spread"
          onClick={() => openTopic(node.id)}
        >
          <Flex flow="row" space="$2" cross="center">
            <ReorderButton
              size="sm"
              title="Reorder this topic"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Icon size="sm" as={HiMenuAlt4} />
            </ReorderButton>
            <Text size="sm" ellipsis>
              {node.title}
            </Text>
          </Flex>
          <Button variant="flat" aria-label="Show topic details">
            <Icon size="lg" as={HiChevronRight} />
          </Button>
        </TopicCard>
      ))}
    </TopicsList>
  )
}

export default Topics
