import React from 'react'
import { Flex, TextField } from '@fxtrot/ui'
import type { StylesObject } from '@fxtrot/ui/dist/utils'

interface Props {
  title: string
}

const style: StylesObject = {
  '& input': {
    fontSize: '$2xl',
    fontWeight: 600,
    p: 0,
  },
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <Flex space="$4">
      <TextField defaultValue={title} variant="inline" css={style} />
    </Flex>
  )
}

export default Header
