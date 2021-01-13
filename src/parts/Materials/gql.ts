import { gql, useMutation } from '@apollo/client'
import type { UpdateTopicMutation, UpdateTopicMutationVariables } from '../../graphql/generated'

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
