import { gql, useQuery, useMutation } from '@apollo/client'
import type {
  GetClassTopicsQuery,
  GetClassTopicsQueryVariables,
  CreateNewTopicMutation,
  CreateNewTopicMutationVariables,
  GetClassInfoQuery,
  GetClassInfoQueryVariables,
  UpdateClassNameMutation,
  UpdateClassNameMutationVariables,
} from '../../graphql/generated'
import { useClassId } from '../../utils'

export const getTopics = gql`
  query getClassTopics($classId: ID!) {
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
  mutation createNewTopic($classId: ID!, $title: String!) {
    createTopic(classId: $classId, title: $title) {
      id
      title
    }
  }
`
export const updateOrder = gql`
  mutation updateTopicOrder($id: ID!, $before: ID, $after: ID) {
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

const getClassInfo = gql`
  query getClassInfo($classId: ID!) {
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

const updateClassName = gql`
  mutation updateClassName($id: ID!, $name: String!) {
    updateClassName(id: $id, name: $name) {
      id
      name
    }
  }
`

export function useUpdateClassName() {
  return useMutation<UpdateClassNameMutation, UpdateClassNameMutationVariables>(updateClassName)
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

export function useClassInfo() {
  const classId = useClassId()
  return useQuery<GetClassInfoQuery, GetClassInfoQueryVariables>(getClassInfo, {
    variables: {
      classId,
    },
  })
}
