import React from 'react'
import { Button, ThemeProvider, Icon } from '@fxtrot/ui'
import { HiOutlineTrash } from 'react-icons/hi'
import { gql, useMutation } from '@apollo/client'

export const DeleteQuestionBlock: React.FC<{ questionId: string }> = ({ questionId }) => {
  const [deleteQuestion, { loading }] = useMutation<DeleteQuestionBlockMutation, DeleteQuestionBlockMutationVariables>(
    deleteQuestionBlockMutation,
    {
      variables: {
        questionId,
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
        disabled={loading}
        onClick={() => deleteQuestion()}
      >
        <Icon as={HiOutlineTrash} />
      </Button>
    </ThemeProvider>
  )
}

const deleteQuestionBlockMutation = gql`
  mutation DeleteQuestionBlock($questionId: ID!) {
    deleteAssignmentQuestion(questionId: $questionId) {
      id
    }
  }
`
