import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import type { GetClassQuery, GetClassQueryVariables } from '../../graphql/generated'
import NoTopics from './NoTopics'

const getTopics = gql`
  query getClass($classId: String!) {
    class(id: $classId) {
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

const TopicsList = () => {
  const router = useRouter()
  const { loading, data } = useQuery<GetClassQuery, GetClassQueryVariables>(getTopics, {
    variables: {
      classId: router.query.classId?.[0],
    },
  })

  if (loading || !data) {
    return null
  }

  const topics = data.class.topics.edges

  if (topics.length === 0) {
    return <NoTopics />
  }

  return <div>{JSON.stringify(data, null, 2)}</div>
}

export default TopicsList
