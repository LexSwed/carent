import { gql, useMutation } from '@apollo/client'
import type {
  DeleteTopicMutation,
  DeleteTopicMutationVariables,
  UpdateTopicMutation,
  UpdateTopicMutationVariables,
} from '../../graphql/generated'
import { useTopicId } from '../../utils'

const updateTopic = gql`
  mutation updateTopic($id: ID!, $title: String, $content: JSON) {
    updateTopic(id: $id, title: $title, content: $content) {
      id
    }
  }
`

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
