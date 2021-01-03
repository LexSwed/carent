import { gql, useQuery, useMutation } from '@apollo/client'
import type {
  GetClassTopicsQuery,
  GetClassTopicsQueryVariables,
  CreateNewTopicMutation,
  CreateNewTopicMutationVariables,
} from '../../../graphql/generated'
import { useClassId } from '../../../utils'

export const getTopics = gql`
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
export const createNewTopic = gql`
  mutation createNewTopic($classId: String!, $title: String!) {
    createTopic(classId: $classId, title: $title) {
      id
      title
    }
  }
`
export const updateOrder = gql`
  mutation updateTopicOrder($id: String!, $before: String, $after: String) {
    reorderTopic(id: $id, before: $before, after: $after) {
      id
      title
    }
  }
`

export function useClassTopics() {
  const classId = useClassId()
  return useQuery<GetClassTopicsQuery, GetClassTopicsQueryVariables>(getTopics, {
    variables: {
      classId,
    },
  })
}
export function useCreateNewTopic() {
  const classId = useClassId()

  return useMutation<CreateNewTopicMutation, CreateNewTopicMutationVariables>(createNewTopic, {
    update(cache, { data: { createTopic: item } }) {
      cache.modify({
        id: cache.identify({
          __typename: 'Class',
          id: classId,
        }),
        fields: {
          topics(existingTopics = {}) {
            return {
              ...existingTopics,
              edges: [
                {
                  __typename: 'TopicEdge',
                  node: item,
                },
                ...existingTopics.edges,
              ],
            }
          },
        },
      })
    },
  })
}
