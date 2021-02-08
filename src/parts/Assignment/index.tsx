import { Flex } from '@fxtrot/ui'
import React from 'react'
import Header from './Header'

import { Card } from '../../shared/Card'

const AssignmentBuilder = () => {
  return (
    <Flex space="$4">
      <Header />
      <Card></Card>
    </Flex>
  )
}

export default AssignmentBuilder
