import React from 'react'
import { Flex, Box, TextField, styled, StyleRecord } from '@fxtrot/ui'
import { gql, useQuery } from '@apollo/client'

import { useTopicId } from '../../../utils'
import Header from './Header'
import Placeholder from './Placeholder'
import type { GetTopicDetailsQuery, GetTopicDetailsQueryVariables } from '../../../graphql/generated'
import Editor from '../../../editor'

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
      <Flex space="$4">
        <Header />
        <Flex space="$8">
          <Box pl="$7">
            <TextField defaultValue={data?.topic.title} variant="inline" css={style.title} />
          </Box>
          <Editor content={data?.topic?.content} />
        </Flex>
      </Flex>
    </EditorPage>
  )
}

export default Topic

const style: StyleRecord = {
  title: {
    '& input': {
      fontSize: '$2xl',
      fontWeight: 600,
      p: 0,
    },
  },
}
const EditorPage = styled('section', {
  display: 'grid',
})

const getTopicDetails = gql`
  query getTopicDetails($id: ID!) {
    topic(id: $id) {
      id
      title
      content
    }
  }
`
