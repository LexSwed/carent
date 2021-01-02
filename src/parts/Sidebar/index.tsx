import React from 'react'
import { Box, Flex } from '@fxtrot/ui'
import UserPanel from './UserPanel'
import Classes from './Classes'

const Sidebar = () => {
  return (
    <Box height="100%" py="$4">
      <Flex space="$4">
        <UserPanel />
        <Classes />
      </Flex>
    </Box>
  )
}

export default Sidebar
