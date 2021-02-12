import React from 'react'
import { Button, Flex } from '@fxtrot/ui'

const AssignmentHeader = () => {
  return (
    <Flex space="$1" cross="center" flow="row" main="end">
      <Button size="sm" variant="flat" disabled>
        saving ? spinner : saved
      </Button>
    </Flex>
  )
}

export default AssignmentHeader
