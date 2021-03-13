import { gql, useMutation, useQuery } from '@apollo/client'
import { useAssignmentId } from '../../utils'
import { QuestionBlockFragment } from './Question/gql'

export const AssignmentSectionFragment = gql`
  fragment AssignmentSectionFragment on AssignmentSection {
    id
    title
    description
  }
`

const GetAssignmentDetailsQuery = gql`
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
    }
  }
  ${QuestionBlockFragment}
`

export function useAssignmentDetails() {
  const id = useAssignmentId()
  return useQuery<GetAssignmentDetailsQuery, GetAssignmentDetailsQueryVariables>(GetAssignmentDetailsQuery, {
    variables: { id },
  })
}

const AppendNewQuestionMutation = gql`
  mutation AppendNewQuestion($afterQuestionId: ID!) {
    addAssignmentQuestion(afterQuestionId: $afterQuestionId) {
      ...QuestionBlockFragment
    }
  }
  ${QuestionBlockFragment}
`

export function useAddNewQuestion(id: string) {
  return useMutation<AppendNewQuestionMutation, AppendNewQuestionMutationVariables>(AppendNewQuestionMutation, {
    variables: {
      afterQuestionId: id,
    },
  })
}
