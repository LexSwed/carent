import { useQuery, gql } from '@apollo/client'

const getAssignments = gql`
  query getAssignments($classId: ID!, $topicId: ID) {
    assignments(classId: $classId, topicId: $topicId, first: 10) {
      edges {
        node {
          id
          title
          description
          topic {
            id
            title
          }
          state {
            id
            open
          }
        }
      }
    }
  }
`

export function useClassAssignments(classId: string, topicId?: string) {
  return useQuery<GetAssignmentsQuery, GetAssignmentsQueryVariables>(getAssignments, {
    variables: {
      classId,
      topicId,
    },
  })
}

// const getTopicTitle = gql`
//   query getTopicTitle($id: ID!) {
//     topic(id: $id) {
//       id
//       title
//     }
//   }
// `

// export function useTopicTitle(id: string) {
//   return useQuery<GetTopicTitleQuery, GetTopicTitleQueryVariables>(getTopicTitle, {
//     variables: {
//       id,
//     },
//     skip: !id,
//   })
// }
