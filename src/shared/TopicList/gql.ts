import { gql, useQuery } from '@apollo/client'
import { useClassId } from '../../utils'

export const updateOrderMutation = gql`
  mutation updateTopicOrder($id: ID!, $before: ID, $after: ID) {
    reorderTopic(id: $id, before: $before, after: $after) {
      id
      title
    }
  }
`

export const getTopics = gql`
  query getClassTopics($classId: ID!) {
    class(id: $classId) {
      id
      name
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
export function useClassTopics() {
  const classId = useClassId()
  return useQuery<GetClassTopicsQuery, GetClassTopicsQueryVariables>(getTopics, {
    variables: {
      classId,
    },
  })
}

/**
 * updateAssignment()
 *   No id
 *     ? create new Block, accept only `type`
 *     : update block
 *
 */
