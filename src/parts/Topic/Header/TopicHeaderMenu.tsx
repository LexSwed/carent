import React from 'react'
import { Button, Box, Dialog, Flex, Text, Icon, Menu } from '@fxtrot/ui'
import { HiChevronDown, HiOutlineTrash } from 'react-icons/hi'
import { useDeleteTopic } from '../gql'
import { useRouter } from 'next/router'
import { useClassTopics } from '../../Class/gql'

const TopicHeaderMenu: React.FC = () => {
  const [deleteTopic] = useDeleteTopic()

  return (
    <Menu>
      <Menu.Button size="sm" space="$2">
        <Icon as={HiChevronDown} />
      </Menu.Button>
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
  const { data } = useClassTopics()

  async function handleDelete() {
    await deleteTopic()
    router.push(`/${data?.class.id}/materials`)
  }

  return (
    <Dialog>
      <Dialog.Trigger as={Menu.Item} aria-label="Delete the document" css={{ color: '$danger' }} variant="flat">
        <Icon size="md" as={HiOutlineTrash} />
        <span>Delete topic</span>
      </Dialog.Trigger>
      {(close) => (
        <Dialog.Modal>
          <Dialog.Title level={3}>Delete topic?</Dialog.Title>
          <Text>This will archive the topic itself and all the materials associated with it.</Text>
          <Box pb="$10" />
          <Flex flow="row" main="end" cross="center" space="sm">
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
