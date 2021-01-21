import React from 'react'
import { Button, Box, Dialog, Flex, TextField, Text, Icon, Menu, Spinner, StyleRecord } from '@fxtrot/ui'
import { HiCheck, HiChevronDown, HiChevronLeft, HiOutlineTrash } from 'react-icons/hi'
import { useDeleteTopic, useTopicDetails } from '../gql'
import Link from 'next/link'
import { useClassId } from '../../../utils'
import { useRouter } from 'next/router'
import { useClassTopics } from '../../Class/gql'

const Header: React.FC = () => {
  const [deleteTopic, { loading }] = useDeleteTopic()
  const classId = useClassId()
  const { data } = useTopicDetails()

  return (
    <Flex flow="row" main="spread" cross="center">
      <Flex flow="row" cross="center" space="$4">
        <Link href={`/${classId}`}>
          <Button variant="flat" as="a">
            <Icon as={HiChevronLeft} size="xl" />
          </Button>
        </Link>
        <TextField value={data?.topic.title} variant="inline" css={style.title} />
      </Flex>
      <Flex space="$8" flow="row" main="end" cross="center">
        <SaveIndicator loading={loading} />

        <Menu>
          <Menu.Button size="sm" space="$2" variant="flat">
            <Icon as={HiChevronDown} />
          </Menu.Button>
          <Menu.List placement="bottom-end">
            <DeleteTopicButton deleteTopic={deleteTopic} />
          </Menu.List>
        </Menu>
      </Flex>
    </Flex>
  )
}

const style: StyleRecord = {
  title: {
    '& input': {
      fontSize: '$2xl',
      fontWeight: 600,
      p: 0,
    },
  },
}

export default Header

const DeleteTopicButton: React.FC<{
  deleteTopic: () => void
}> = ({ deleteTopic }) => {
  const router = useRouter()
  const { data } = useClassTopics()

  async function handleDelete() {
    await deleteTopic()
    router.push(`/${data?.class.id}/${data?.class.topics.edges[0].node.id}`)
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
