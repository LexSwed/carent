import React from 'react'
import Image from 'next/image'
import { Flex } from '@fxtrot/ui'

const Placeholder = () => {
  return (
    <Flex main="center" cross="center">
      <Image src="/draw/add-notes.svg" width="auto" height={200} />
    </Flex>
  )
}

export default Placeholder
