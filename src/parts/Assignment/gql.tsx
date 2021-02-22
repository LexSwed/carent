import { gql, useQuery } from '@apollo/client'
import { useAssignmentId } from '../../utils'
import { QuestionBlockFragment } from './Question/gql'

export const AssignmentSectionFragment = gql`
  fragment AssignmentSectionFragment on AssignmentSection {
    id
    title
    description
  }
`

const getAssignmentDetails = gql`
  query GetAssignmentDetails($id: ID!, $variant: AssignmentVariantWhereUniqueInput) {
    assignment(id: $id) {
      id
      title
      description
      state {
        open
      }
      allVariants: variants {
        id
        name
      }
      variants(first: 1, after: $variant) {
        id
        name
        questions {
          ...QuestionBlockFragment
        }
      }
      sections {
        ...AssignmentSectionFragment
      }
    }
  }
  ${QuestionBlockFragment}
  ${AssignmentSectionFragment}
`

export function useAssignmentDetails() {
  const id = useAssignmentId()
  return useQuery<GetAssignmentDetailsQuery, GetAssignmentDetailsQueryVariables>(getAssignmentDetails, {
    variables: { id },
  })
}
