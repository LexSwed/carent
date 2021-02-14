import { gql, useQuery } from '@apollo/client'
import { useAssignmentId } from '../../utils'

import Question from './Question'
import Section from './Section'

const getAssignmentDetails = gql`
  query getAssignmentDetails($id: ID!) {
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
          ...QuestionBlock
        }
      }
    }
  }
  ${Question.fragment}
  ${Section.fragment}
`

export function useAssignmentDetails() {
  const id = useAssignmentId()
  return useQuery<GetAssignmentDetailsQuery, GetAssignmentDetailsQueryVariables>(getAssignmentDetails, {
    variables: { id },
  })
}
