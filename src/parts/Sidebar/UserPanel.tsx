import React from 'react'
import { Text, Icon, Menu, styled } from '@fxtrot/ui'
import { signOut, useSession } from 'next-auth/client'
import { HiOutlineCog, HiOutlineDotsHorizontal, HiUserCircle, HiOutlineLogout } from 'react-icons/hi'

const Card = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  gap: '$4',
  alignItems: 'center',
  boxShadow: '$xs',
  br: '$lg',
  bc: '$surfaceStill',
  p: '$3',
})

const Avatar = styled('span', {
  boxShadow: '0 0 2px $primaryHover',
  br: '$round',
  size: '$8',
  p: '1px',
  color: '$textLight',
})

const UserPanel = () => {
  const [session] = useSession()

  const user = session?.user || {}

  return (
    <Card>
      {user.image ? <Avatar as="img" src={user.image} /> : <Avatar as={HiUserCircle} />}
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
    </Card>
  )
}

export default UserPanel
