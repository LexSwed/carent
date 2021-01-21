import React from 'react'
import { Button, Box, Dialog, Flex, Text, Icon, Menu, Spinner } from '@fxtrot/ui'
import { useClassId, useTopicId } from '../../../utils'
import { HiCheck, HiChevronDown, HiChevronLeft, HiOutlineTrash } from 'react-icons/hi'
import { useClassInfo, useDeleteTopic } from '../gql'
import { Card } from '../../Card'
import Link from 'next/link'

const Header: React.FC = () => {
  const loading = true
  const { data } = useClassInfo()
  const [deleteTopic] = useDeleteTopic()

  return (
    <Flex flow="row" main="spread" cross="center">
      <Link href={`/${data?.class.id}`}>
        <Button size="lg" variant="flat" as="a" css={{ pl: '$2' }}>
          <Icon as={HiChevronLeft} size="lg" /> <Text size="lg">{data?.class.name}</Text>
        </Button>
      </Link>
      <Flex space="$8" flow="row" main="end" cross="center">
        <SaveIndicator loading={loading} />

        <Menu>
          <Menu.Button size="sm" space="$2" variant="flat">
            <Icon as={HiChevronDown} />
          </Menu.Button>
          <Menu.List placement="bottom-end">
            <DeleteTopicButton />
          </Menu.List>
        </Menu>
      </Flex>
    </Flex>
  )
}

export default Header

const DeleteTopicButton = () => {
  const [deleteTopic] = useDeleteTopic()

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
            <Button onClick={() => deleteTopic()} variant="flat">
              Submit
            </Button>
          </Flex>
        </Dialog.Modal>
      )}
    </Dialog>
  )
}

const SaveIndicator: React.FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <Flex flow="row" cross="center" space="sm">
      {loading ? (
        <>
          <Spinner size="sm" />
          <Text size="sm" tone="light" aria-label="Saving the updates">
            Saving
          </Text>
        </>
      ) : (
        <>
          <Icon size="md" as={HiCheck} />
          <Text size="sm" tone="light" aria-label="Updates are saved">
            Saved
          </Text>
        </>
      )}
    </Flex>
  )
}
