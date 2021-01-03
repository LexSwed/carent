import { Flex } from '@fxtrot/ui'
import Image from 'next/image'
import React from 'react'
import { useTopicId } from '../../../utils'

const Topic = () => {
  const id = useTopicId()

  return (
    <Flex main="center" cross="center">
      <Image src="/draw/add-notes.svg" width="auto" height={200} />
    </Flex>
  )
}

export default Topic
