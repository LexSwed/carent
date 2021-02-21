import React from 'react'
import { Button, ThemeProvider, Icon } from '@fxtrot/ui'
import { HiOutlineTrash } from 'react-icons/hi'
import { useAssignmentDetails } from '../gql'
import { gql, useMutation } from '@apollo/client'
import { useAssignmentId } from '../../../utils'

export const DeleteQuestionBlock: React.FC<{ questionId: string }> = ({ questionId }) => {
  const assignmentId = useAssignmentId()
  const { data } = useAssignmentDetails()
  const [deleteQuestion, { loading }] = useMutation<DeleteQuestionBlockMutation, DeleteQuestionBlockMutationVariables>(
    deleteQuestionBlockMutation,
    {
      variables: {
        questionId,
        assignmentId,
      },
      update(cache, { data }) {
        cache.evict({
          id: cache.identify({
            __typename: 'AssignmentQuestion',
            id: data.deleteAssignmentQuestion.id,
          }),
        })
        cache.gc()
      },
    }
  )

  return (
    <ThemeProvider theme="red">
      <Button
        title="Delete question"
        main="spread"
        variant="primary"
        disabled={loading || data.assignment.sections[0].questions.length === 1}
        onClick={() => deleteQuestion()}
      >
        Delete
        <Icon as={HiOutlineTrash} />
      </Button>
    </ThemeProvider>
  )
}

const deleteQuestionBlockMutation = gql`
  mutation DeleteQuestionBlock($assignmentId: ID!, $questionId: ID!) {
    deleteAssignmentQuestion(assignmentId: $assignmentId, questionId: $questionId) {
      id
    }
  }
`
