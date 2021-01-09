import React from 'react'
import { Box, Flex, Heading } from '@fxtrot/ui'

import ContentEditable from '../../../editor/own/ContentEditable'

interface Props {
  title: string
}

// avoid TS yelling at me
const extraProps = {
  as: Heading,
  level: 2,
} as any

const Header: React.FC<Props> = ({ title }) => {
  function update(newTitle) {
    console.log({ newTitle })
  }

  return (
    <Flex space="$4">
      <Box py="$1">
        <ContentEditable {...extraProps} onBlur={update} html={title} />
      </Box>
    </Flex>
  )
}

export default Header
