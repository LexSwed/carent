import React, { useCallback } from 'react'
import { Box, Button, Dialog, Flex, Icon, Menu, ThemeProvider } from '@fxtrot/ui'

import { Card } from '../../../shared/Card'
import Header from './Header'
import { HiOutlineArchive, HiOutlineDotsVertical } from 'react-icons/hi'
import { gql, useMutation } from '@apollo/client'
import { useAssignmentId, useClassId } from '../../../utils'
import { useRouter } from 'next/router'

const Sidebar = () => {
  return (
    <Card>
      <Flex space="$4">
        <Header />
        <Flex flow="row" space="$6" main="spread">
          <Button variant="outline" size="sm" main="center">
            Start accepting responses
          </Button>
          <Menu>
            <Menu.Button variant="flat" size="sm" title="Assignment options">
              <Icon as={HiOutlineDotsVertical} />
            </Menu.Button>
            <Menu.List placement="bottom-end" css={{ width: 140 }}>
              <DeleteAssignment />
            </Menu.List>
          </Menu>
        </Flex>
        Variants
      </Flex>
    </Card>
  )
}

export default Sidebar

const DeleteAssignment = () => {
  const archive = useDeleteAssignment()

  return (
    <Dialog>
      <Dialog.Trigger variant="flat" css={{ color: '$danger' }} as={Menu.Item}>
        <Icon as={HiOutlineArchive} /> Archive
      </Dialog.Trigger>
      {(close) => (
        <Dialog.Modal>
          <Dialog.Title level={4}>Archive this assignment?</Dialog.Title>
          <Box as="p" pb="$4">
            You'll be able to restore it within first 30 days.
          </Box>
          <Flex flow="row" main="end" cross="center" space="$2">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <ThemeProvider theme="red">
              <Button variant="primary" onClick={archive}>
                Archive
              </Button>
            </ThemeProvider>
          </Flex>
        </Dialog.Modal>
      )}
    </Dialog>
  )
}

export function useDeleteAssignment() {
  const id = useAssignmentId()
  const classId = useClassId()
  const router = useRouter()

  const [archive] = useMutation<DeleteAssignmentMutation, DeleteAssignmentMutationVariables>(deleteAssignment, {
    variables: { id },
    update(cache, { data }) {
      cache.evict({
        id: cache.identify({
          __typename: 'Assignment',
          id: data.archiveAssignment.id,
        }),
      })
      cache.gc()
    },
  })

  return useCallback(async () => {
    await archive()
    router.push(`/${classId}`)
  }, [archive, classId, router])
}

const deleteAssignment = gql`
  mutation deleteAssignment($id: ID!) {
    archiveAssignment(id: $id) {
      id
    }
  }
`
