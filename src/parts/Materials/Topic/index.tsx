import React from 'react'
import { Flex } from '@fxtrot/ui'
import { gql, useQuery } from '@apollo/client'

import { useTopicId } from '../../../utils'
import Header from './Header'
import Placeholder from './Placeholder'
import type { GetTopicDetailsQuery, GetTopicDetailsQueryVariables } from '../../../graphql/generated'
import Editor from '../../../editor'

const getTopicDetails = gql`
  query getTopicDetails($id: String!) {
    topic(id: $id) {
      id
      title
      description
    }
  }
`

const Topic = () => {
  const topicId = useTopicId()
  const { data, loading } = useQuery<GetTopicDetailsQuery, GetTopicDetailsQueryVariables>(getTopicDetails, {
    variables: {
      id: topicId,
    },
  })

  if (!topicId) {
    return <Placeholder />
  }

  if (loading) {
    return null
  }

  return (
    <Flex space="$4">
      <Header title={data?.topic.title} />
      <Editor />
    </Flex>
  )
}

export default Topic
