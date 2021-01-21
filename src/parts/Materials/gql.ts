import { gql, useMutation, useQuery } from '@apollo/client'
import type {
  DeleteTopicMutation,
  DeleteTopicMutationVariables,
  GetClassInfoQuery,
  GetClassInfoQueryVariables,
  UpdateTopicMutation,
  UpdateTopicMutationVariables,
} from '../../graphql/generated'
import { useClassId, useTopicId } from '../../utils'

const updateTopic = gql`
  mutation updateTopic($id: ID!, $title: String) {
    updateTopic(id: $id, title: $title) {
      id
    }
  }
`

const getShortClassInfo = gql`
  query getShortClassInfo($classId: ID!) {
    class(id: $classId) {
      id
      name
      group {
        id
        code
      }
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

export function useClassInfo() {
  const classId = useClassId()
  return useQuery<GetClassInfoQuery, GetClassInfoQueryVariables>(getShortClassInfo, {
    variables: {
      classId,
    },
  })
}
