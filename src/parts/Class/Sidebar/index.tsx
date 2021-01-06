import React from 'react'
import { Flex } from '@fxtrot/ui'
import UserPanel from './UserPanel'
import Classes from './Classes'

const Sidebar = () => {
  return (
    <Flex space="$4">
      <UserPanel />
      <Classes />
    </Flex>
  )
}

export default Sidebar
