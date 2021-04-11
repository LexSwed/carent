import React from 'react'
import { Text, Icon, Menu, Item, styled, Flex, Button } from '@fxtrot/ui'
import { signOut, useSession } from 'next-auth/client'
import { CogIcon, DotsHorizontalIcon, LogoutIcon } from '@heroicons/react/outline'

import { Card } from './Card'

const Panel = styled(Card, {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  gap: '$4',
  alignItems: 'center',
  position: 'sticky',
  bottom: '$4',
})

const Avatar = styled(Flex, {
  br: '$round',
  size: '$12',
  p: '1px',
  color: '$textLight',
  overflow: 'hidden',
})

const Dummy = styled('div', {
  width: '100%',
  height: '100%',
  br: '$round',
  bc: '$primaryLight',
  backgroundImage: "url('/draw/confetti-doodles.svg')",
  backgroundSize: 'cover',
})

const UserPanel: React.FC<React.ComponentProps<typeof Panel>> = (props) => {
  const [session] = useSession()

  const user = session?.user || {}

  return (
    <Panel {...props}>
      {user.image ? (
        <Avatar as="img" src={user.image} />
      ) : (
        <Avatar main="center" cross="center">
          <Dummy />
        </Avatar>
      )}
      <Text>{user.name}</Text>
      <Menu>
        <Button size="sm" variant="flat">
          <Icon as={DotsHorizontalIcon} />
        </Button>
        <Menu.List css={{ width: '$32' }} placement="bottom-end">
          <Item gap="3">
            <Icon as={CogIcon} />
            <Text size="sm">Settings</Text>
          </Item>
          <Item gap="3" onClick={() => signOut()}>
            <Icon as={LogoutIcon} />
            <Text size="sm">Sign Out</Text>
          </Item>
        </Menu.List>
      </Menu>
    </Panel>
  )
}

export default UserPanel
