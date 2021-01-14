import React from 'react'
import { Flex, Box } from '@fxtrot/ui'
import Image from 'next/image'

import ClassHeader from './Header'
import MaterialsSection from './MaterialsSection'
import { useClassId } from '../../utils'

const ClassPage = () => {
  const classId = useClassId()

  if (!classId) {
    return (
      <Box maxWidth={800} py="20vh">
        <Flex cross="center">
          <Image src="/draw/post.svg" width="auto" height={200} />
        </Flex>
      </Box>
    )
  }

  return (
    <Box maxWidth={600}>
      <Flex space="$12">
        <ClassHeader />
        <Flex space="$8">
          <MaterialsSection />
        </Flex>
      </Flex>
    </Box>
  )
}

export default ClassPage
