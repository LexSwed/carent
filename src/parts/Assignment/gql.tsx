import { gql, useQuery } from '@apollo/client'
import { useAssignmentId } from '../../utils'

import Question from './Question'
import SectionHeader from './SectionHeader'

const getAssignmentDetails = gql`
  query GetAssignmentDetails($id: ID!) {
    assignment(id: $id) {
      id
      title
      description
      state {
        open
      }
      variants {
        id
        name
      }
      sections {
        ...AssignmentSectionFragment
        questions {
          ...QuestionBlockFragment
        }
      }
    }
  }
  ${Question.fragment}
  ${SectionHeader.fragment}
`

export function useAssignmentDetails() {
  const id = useAssignmentId()
  return useQuery<GetAssignmentDetailsQuery, GetAssignmentDetailsQueryVariables>(getAssignmentDetails, {
    variables: { id },
  })
}
