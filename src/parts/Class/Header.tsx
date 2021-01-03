import { Flex, Heading } from '@fxtrot/ui'
import React from 'react'
import ContentEditable from '../../editor/ContentEditable'
import { useClassInfo } from './gql'

const ClassHeader = () => {
  const { data } = useClassInfo()

  const name = data?.class.name
  const code = data?.class.group.code

  return (
    <Flex flow="row" space="$4">
      <ContentEditable defaultValue={name} as={Heading} />
      <Heading variant="light">{code}</Heading>
    </Flex>
  )
}

export default ClassHeader
