import { gql, useMutation, useQuery } from '@apollo/client'
import { useCallback } from 'react'
import type {
  DeleteTopicMutation,
  DeleteTopicMutationVariables,
  UpdateTopicMutation,
  UpdateTopicMutationVariables,
  GetTopicDetailsQuery,
  GetTopicDetailsQueryVariables,
  UpdateTopicTitleMutationVariables,
  UpdateTopicTitleMutation,
  GetTopicAttachmentsQuery,
  GetTopicAttachmentsQueryVariables,
} from '../../graphql/generated'
import { useClassId, useTopicId } from '../../utils'

const updateTopic = gql`
  mutation updateTopic($id: ID!, $title: String) {
    updateTopic(id: $id, title: $title) {
      id
    }
  }
`

const getTopicDetails = gql`
  query getTopicDetails($id: ID!) {
    topic(id: $id) {
      id
      title
    }
  }
`

export function useTopicDetails() {
  const topicId = useTopicId()
  return useQuery<GetTopicDetailsQuery, GetTopicDetailsQueryVariables>(getTopicDetails, {
    variables: {
      id: topicId,
    },
  })
}

export function useUpdateTopic() {
  return useMutation<UpdateTopicMutation, UpdateTopicMutationVariables>(updateTopic)
}

const deleteTopic = gql`
  mutation deleteTopic($id: ID!) {
    deleteTopic(id: $id) {
      id
    }
  }
`

export function useDeleteTopic() {
  const classId = useClassId()
  const topicId = useTopicId()

  return useMutation<DeleteTopicMutation, DeleteTopicMutationVariables>(deleteTopic, {
    variables: { id: topicId },
    update(cache, { data: { deleteTopic } }) {
      cache.modify({
        id: cache.identify({
          __typename: 'Class',
          id: classId,
        }),
        fields: {
          topics: (topicsConnection, { readField }) => {
            return {
              ...topicsConnection,
              edges: topicsConnection.edges.filter(({ node }) => deleteTopic.id !== readField('id', node)),
            }
          },
        },
      })
      cache.evict({ id: cache.identify(deleteTopic) })
      cache.gc()
    },
  })
}

const updateTopicTitle = gql`
  mutation updateTopicTitle($id: ID!, $title: String!) {
    updateTopic(id: $id, title: $title) {
      id
      title
    }
  }
`
export function useOnBlurUpdateTopicTitle() {
  const topicId = useTopicId()
  const { data } = useTopicDetails()

  const [update] = useMutation<UpdateTopicTitleMutation, UpdateTopicTitleMutationVariables>(updateTopicTitle)

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const title = e.target.value

      if (data?.topic.title === title) {
        return null
      }

      update({
        variables: {
          id: topicId,
          title,
        },
      })
    },
    [data?.topic.title, topicId, update]
  )

  return handleBlur
}

const getTopicAttachments = gql`
  query getTopicAttachments($id: ID!) {
    topic(id: $id) {
      id
      attachments(first: 20) {
        edges {
          node {
            id
            href
          }
        }
      }
    }
  }
`

export function useTopicAttachments() {
  const topicId = useTopicId()

  return useQuery<GetTopicAttachmentsQuery, GetTopicAttachmentsQueryVariables>(getTopicAttachments, {
    variables: {
      id: topicId,
    },
  })
}
