import React from 'react'
import { Flex, Box } from '@fxtrot/ui'

import ClassHeader from './Header'
import MaterialsSection from './MaterialsSection'

const ClassPage = () => {
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
