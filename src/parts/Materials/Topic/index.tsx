import React from 'react'
import { Flex, Box, styled } from '@fxtrot/ui'
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

const EditorPage = styled('section', {
  display: 'grid',
  maxWidth: 800,
  m: '0 auto',
})

const Topic = () => {
  const topicId = useTopicId()
  const { data, loading } = useQuery<GetTopicDetailsQuery, GetTopicDetailsQueryVariables>(getTopicDetails, {
    variables: {
      id: topicId,
    },
  })

  if (loading) {
    return null
  }

  if (!topicId) {
    return <Placeholder />
  }

  return (
    <EditorPage>
      <Flex space="$8">
        <Box pl="$8">
          <Header title={data?.topic.title} />
        </Box>
        <Editor />
      </Flex>
    </EditorPage>
  )
}

export default Topic
