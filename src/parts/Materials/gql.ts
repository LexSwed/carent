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
} from '../../graphql/generated'
import { useTopicId } from '../../utils'

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
  const topicId = useTopicId()

  return useMutation<DeleteTopicMutation, DeleteTopicMutationVariables>(deleteTopic, { variables: { id: topicId } })
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

  const [update] = useMutation<UpdateTopicTitleMutation, UpdateTopicTitleMutationVariables>(updateTopicTitle)

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const title = e.target.value

      update({
        variables: {
          id: topicId,
          title,
        },
      })
    },
    [topicId, update]
  )

  return handleBlur
}
