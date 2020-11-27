import React from 'react'
import { Box, Flex, Heading, Icon, Menu, styled } from '@fxtrot/ui'
import { useSession } from 'next-auth/client'
import { HiOutlineCog, HiOutlineDotsHorizontal, HiUserCircle, HiOutlineLogout } from 'react-icons/hi'

const UserPanel = styled(Flex, {
  boxShadow: '$base',
  br: '$lg',
  bc: '$surfaceStill',
  p: '$3',
})

const Avatar = styled('span', {
  boxShadow: '0 0 2px $primaryHover',
  br: '$round',
  size: '$10',
  p: '1px',
  color: '$textLight',
})

const Sidebar = () => {
  const [session] = useSession()

  const user = session?.user || {}

  return (
    <Box height="100%" bc="$blueGray50" p="$4">
      <UserPanel flow="row" main="spread" cross="center">
        <Flex flow="row" space="sm" cross="center">
          {user.image ? <Avatar as="img" src={user.image} /> : <Avatar as={HiUserCircle} />}
          <Heading as="h4">{user.name}</Heading>
        </Flex>
        <Menu>
          <Menu.Button variant="flat">
            <Icon as={HiOutlineDotsHorizontal} />
          </Menu.Button>
          <Menu.List placement="bottom-end">
            <Menu.Item>
              <Icon as={HiOutlineCog} />
              <span>Settings</span>
            </Menu.Item>
            <Menu.Item>
              <Icon as={HiOutlineLogout} />
              <span>Sign Out</span>
            </Menu.Item>
          </Menu.List>
        </Menu>
      </UserPanel>
    </Box>
  )
}

export default Sidebar
