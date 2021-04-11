import React from 'react'
import { Button, Box, Dialog, Flex, Text, Icon, Menu, Item } from '@fxtrot/ui'
import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/outline'
import { useDeleteTopic } from '../gql'
import { useRouter } from 'next/router'
import { useClassId } from '../../../utils'

const TopicHeaderMenu: React.FC = () => {
  const [deleteTopic] = useDeleteTopic()

  return (
    <Menu>
      <Button gap="2" variant="flat">
        <Icon as={DotsVerticalIcon} />
      </Button>
      <Menu.List placement="bottom-end">
        <DeleteTopicButton deleteTopic={deleteTopic} />
      </Menu.List>
    </Menu>
  )
}

const DeleteTopicButton: React.FC<{
  deleteTopic: () => Promise<any>
}> = ({ deleteTopic }) => {
  const router = useRouter()
  const id = useClassId()

  async function handleDelete() {
    await deleteTopic()
    router.push(`/${id}/materials`)
  }

  return (
    <Dialog>
      <Item aria-label="Delete the document" css={{ color: '$danger' }}>
        <Icon size="md" as={TrashIcon} />
        <span>Delete topic</span>
      </Item>
      {(close) => (
        <Dialog.Modal>
          <Dialog.Title level={3}>Delete topic?</Dialog.Title>
          <Text>This will archive the topic itself and all the materials associated with it.</Text>
          <Box pb="$10" />
          <Flex flow="row" main="end" cross="center" gap="4">
            <Button onClick={close}>Cancel</Button>
            <Button onClick={handleDelete} variant="flat">
              Submit
            </Button>
          </Flex>
        </Dialog.Modal>
      )}
    </Dialog>
  )
}

export default TopicHeaderMenu
