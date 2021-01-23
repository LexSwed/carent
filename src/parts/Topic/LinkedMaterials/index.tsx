import React from 'react'

import { Flex, Heading } from '@fxtrot/ui'
import AttachLink from './AttachLink'

const LinkedMaterials = () => {
  return (
    <Flex space="$8">
      <Heading level={3}>Linked Materials</Heading>
      <AttachLink />
    </Flex>
  )
}

export default LinkedMaterials
