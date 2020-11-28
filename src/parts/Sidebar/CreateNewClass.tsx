import React from 'react'
import { Button, Flex, Icon, ThemeProvider } from '@fxtrot/ui'
import { HiPlus } from 'react-icons/hi'

const CreateNewClass = () => {
  return (
    <Flex cross="spread">
      <Button main="center" variant="outline">
        <Icon as={HiPlus} />
        <span>Create new</span>
      </Button>
    </Flex>
  )
}

export default CreateNewClass
