import { gql, useQuery, useMutation } from '@apollo/client'
import { useClassId } from '../../utils'

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

const createNewTopic = gql`
  mutation createNewTopic($classId: ID!, $title: String!) {
    createTopic(classId: $classId, title: $title) {
      id
      title
    }
  }
`
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
            const newTopicNodeRef = cache.writeFragment({
              data: item,
              fragment: gql`
                fragment NewTopic on Topic {
                  id
                  title
                }
              `,
            })
            return {
              ...existingTopics,
              edges: [
                {
                  __typename: 'TopicEdge',
                  node: newTopicNodeRef,
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
