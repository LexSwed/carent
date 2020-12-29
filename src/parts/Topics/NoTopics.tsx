import React from 'react'
import { Flex, Text } from '@fxtrot/ui'
import Image from 'next/image'

const NoTopics = () => {
  return (
    <Flex space="$8" flow="row" cross="center">
      <Image src="/draw/education.svg" alt="A woman standing on two books" height="auto" width={120} />
      <Text tone="light" size="sm">
        Create first lesson
      </Text>
    </Flex>
  )
}

export default NoTopics
