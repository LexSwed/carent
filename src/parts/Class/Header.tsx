import { Flex, Heading } from '@fxtrot/ui'
import React from 'react'
import ContentEditable from '../../editor/ContentEditable'

interface Props {
  name: string
  code: string
}

const ClassHeader: React.FC<Props> = ({ name, code }) => {
  return (
    <Flex flow="row" space="$4">
      <ContentEditable defaultValue={name} as={Heading} />
      <Heading variant="light">{code}</Heading>
    </Flex>
  )
}

export default ClassHeader
