import React from 'react'
import { Button, Dialog, Flex, Heading, Text, Icon, Menu, Spinner } from '@fxtrot/ui'
import { useTopicId } from '../../../utils'
import { HiCheck, HiChevronDown, HiOutlineTrash } from 'react-icons/hi'
import { useDeleteTopic } from '../gql'

const Header: React.FC = () => {
  const loading = true
  const [deleteTopic] = useDeleteTopic()

  return (
    <Flex space="$8" flow="row" main="end" cross="center">
      <SaveIndicator loading={loading} />

      <Menu>
        <Menu.Button size="sm" variant="flat" space="$2">
          <Icon as={HiChevronDown} />
        </Menu.Button>
        <Menu.List>
          <Menu.Item aria-label="Delete the document" css={{ color: '$danger' }} onClick={() => deleteTopic()}>
            <Icon size="md" as={HiOutlineTrash} />
            <span>Delete topic</span>
          </Menu.Item>
        </Menu.List>
      </Menu>
    </Flex>
  )
}

export default Header

// const DeleteTopicButton = () => {
//   const [deleteTopic] = useDeleteTopic()

//   return (
//     <Dialog.Trigger>
//       <Menu.Item aria-label="Delete the document" css={{ color: '$danger' }}>
//         <Icon size="md" as={HiOutlineTrash} />
//         <span>Delete topic</span>
//       </Menu.Item>
//       {(close) => (
//         <Dialog.Modal>
//           <Heading>Delete topic?</Heading>
//           <Text>This will delete the topic itself and all the materials associated with it.</Text>
//           <Flex flow="row" space="sm">
//             <Button onClick={close}>Cancel</Button>
//             <Button onClick={() => deleteTopic()} variant="flat">
//               Submit
//             </Button>
//           </Flex>
//         </Dialog.Modal>
//       )}
//     </Dialog.Trigger>
//   )
// }

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
