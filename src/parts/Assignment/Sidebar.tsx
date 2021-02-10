import { Flex } from '@fxtrot/ui'
import React from 'react'

import { Card } from '../../shared/Card'
import Header from './Header'

const Sidebar = () => {
  return (
    <Card>
      <Flex>
        <Header />
        Variants
      </Flex>
    </Card>
  )
}

export default Sidebar
