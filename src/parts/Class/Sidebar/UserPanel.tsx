import React from 'react'
import { Text, Icon, Menu, styled, Flex } from '@fxtrot/ui'
import { signOut, useSession } from 'next-auth/client'
import { HiOutlineCog, HiOutlineDotsHorizontal, HiOutlineLogout } from 'react-icons/hi'

const Panel = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  gap: '$4',
  alignItems: 'center',
  mx: '$4',
  br: '$md',
})

const Avatar = styled(Flex, {
  br: '$round',
  size: '$12',
  p: '1px',
  color: '$textLight',
  overflow: 'hidden',
})

const Dummy = styled('div', {
  size: '100%',
  br: '$round',
  bc: '$primaryLight',
  backgroundImage: "url('/draw/confetti-doodles.svg')",
  backgroundSize: 'cover',
})

const UserPanel = () => {
  const [session] = useSession()

  const user = session?.user || {}

  return (
    <Panel>
      {user.image ? (
        <Avatar as="img" src={user.image} />
      ) : (
        <Avatar main="center" cross="center">
          <Dummy />
        </Avatar>
      )}
      <Text ellipsis>{user.name}</Text>
      <Menu>
        <Menu.Button variant="flat">
          <Icon as={HiOutlineDotsHorizontal} />
        </Menu.Button>
        <Menu.List placement="bottom-end">
          <Menu.Item>
            <Icon as={HiOutlineCog} />
            <span>Settings</span>
          </Menu.Item>
          <Menu.Item onClick={() => signOut()}>
            <Icon as={HiOutlineLogout} />
            <span>Sign Out</span>
          </Menu.Item>
        </Menu.List>
      </Menu>
    </Panel>
  )
}

export default UserPanel