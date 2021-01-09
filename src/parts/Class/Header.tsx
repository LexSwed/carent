import { Flex, Heading } from '@fxtrot/ui'
import React, { useState } from 'react'
import ContentEditable from '../../editor/own/ContentEditable'
import { useClassId } from '../../utils'
import { useClassInfo, useUpdateClassName } from './gql'

const ClassHeader = () => {
  const { data } = useClassInfo()
  const [newName, setNewName] = useState(data?.class.name)
  const id = useClassId()
  const [update] = useUpdateClassName()

  function handleBlur() {
    const name = newName?.trim()
    if (name && name !== data?.class.name) {
      update({
        variables: {
          id,
          name,
        },
      })
    }
  }

  return (
    <Flex flow="row" space="$4">
      <ContentEditable html={data?.class.name} onInput={setNewName} as={Heading} onBlur={handleBlur} />
      <Heading variant="light">{data?.class.group.code}</Heading>
    </Flex>
  )
}

export default ClassHeader
