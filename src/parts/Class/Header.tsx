import { TextField } from '@fxtrot/ui'
import React, { useEffect, useState } from 'react'
import { useClassId } from '../../utils'
import { useClassInfo, useUpdateClassName } from './gql'

const ClassHeader = () => {
  const { data } = useClassInfo()
  const [newName, setNewName] = useState('')
  const id = useClassId()
  const [update] = useUpdateClassName()

  useEffect(() => {
    setNewName(data?.class.name)
  }, [data?.class.name])

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

  return <TextField size="xl" value={newName} onChange={setNewName} variant="transparent" onBlur={handleBlur} />
}

export default ClassHeader
