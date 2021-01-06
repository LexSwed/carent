import React, { useState } from 'react'
import { Box, Flex, Heading } from '@fxtrot/ui'

import ContentEditable from '../../../editor/ContentEditable'

interface Props {
  title: string
  description: string
}

// avoid TS yelling at me
const extraProps = {
  as: Heading,
  level: 2,
} as any

const Header: React.FC<Props> = ({ title, description }) => {
  const [newTitle, setTitle] = useState(title)
  const [newDescription, setDescription] = useState(description)

  function update() {
    console.log({ newTitle, newDescription })
  }
  return (
    <Flex space="$4" onBlur={update}>
      <Box py="$1">
        <ContentEditable {...extraProps} value={newTitle} onInput={setTitle} />
      </Box>
      <ContentEditable
        placeholder="Type in goals, description, notes..."
        value={newDescription}
        onInput={setDescription}
      />
    </Flex>
  )
}

export default Header
