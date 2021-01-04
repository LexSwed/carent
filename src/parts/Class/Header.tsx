import { Flex, Heading } from '@fxtrot/ui'
import React, { useState } from 'react'
import ContentEditable from '../../editor/ContentEditable'
import { useClassId } from '../../utils'
import { useClassInfo, useUpdateClassName } from './gql'

const ClassHeader = () => {
  const { data } = useClassInfo()
  const [newName, setNewName] = useState(data?.class.name)
  const id = useClassId()
  const [update] = useUpdateClassName()

  function handleBlur() {
    const name = newName.trim()
    if (name) {
      update({
        variables: {
          id,
          name,
        },
      })
    }
  }

  const code = data?.class.group.code

  return (
    <Flex flow="row" space="$4">
      <ContentEditable
        value={newName}
        onInput={setNewName}
        defaultValue={data?.class.name}
        as={Heading}
        onBlur={handleBlur}
      />
      <Heading variant="light">{code}</Heading>
    </Flex>
  )
}

export default ClassHeader
