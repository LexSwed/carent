import { gql, useQuery } from '@apollo/client'
import { useAssignmentId } from '../../utils'

const getAssignmentDetails = gql`
  query getAssignmentDetails($id: ID!) {
    assignment(id: $id) {
      id
      title
      description
    }
  }
`

export function useAssignmentDetails() {
  const id = useAssignmentId()
  return useQuery<GetAssignmentDetailsQuery, GetAssignmentDetailsQueryVariables>(getAssignmentDetails, {
    variables: { id },
  })
}

/**
 * Mutations:
 *   - addAssignmentQuestion(assignmentId, type)
 *   - duplicateAssignmentQuestion(assignmentId, questionId)
 *   - updateAssignmentQuestion(assignmentId, { type, correctAnswers, hint, content })
 */
