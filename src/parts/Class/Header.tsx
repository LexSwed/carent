import { Grid, Heading, StyleRecord, TextField } from '@fxtrot/ui'
import React, { useEffect, useState } from 'react'
import { useClassId } from '../../utils'
import { useClassInfo, useUpdateClassName } from './gql'

const styles: StyleRecord = {
  input: {
    '& input': {
      fontSize: '$2xl',
      fontWeight: 600,
      p: 0,
    },
  },
  group: {
    m: 0,
  },
}

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

  return (
    <Grid columns="1fr auto" space="$4">
      <TextField css={styles.input} value={newName} onChange={setNewName} variant="inline" onBlur={handleBlur} />
      {/* <Heading css={styles.group} level={4} variant="light">
        {data?.class.group.code}
      </Heading> */}
    </Grid>
  )
}

export default ClassHeader
