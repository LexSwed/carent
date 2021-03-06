import React from 'react'
import { Button, ThemeProvider, Icon, Dialog, Flex } from '@fxtrot/ui'
import { TrashIcon } from '@heroicons/react/outline'
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
      <Dialog>
        <Button title="Delete question" main="center" variant="primary" disabled={loading}>
          <Icon as={TrashIcon} />
        </Button>
        {(close) => (
          <Dialog.Modal>
            <Flex gap="12">
              <Dialog.Title level={3}>Delete this question with the content and all answers?</Dialog.Title>
              <Flex gap="2" flow="row" main="end">
                <Button variant="flat" onClick={close}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => deleteQuestion()}>
                  Delete
                </Button>
              </Flex>
            </Flex>
          </Dialog.Modal>
        )}
      </Dialog>
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
