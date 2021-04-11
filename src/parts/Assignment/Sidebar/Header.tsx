import React, { useState } from 'react'
import { Button, Flex, Icon, TextField } from '@fxtrot/ui'
import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/outline'

import { useClassId } from '../../../utils'
import { useAssignmentDetails } from '../gql'

const Header = () => {
  const classId = useClassId()
  const [title, setNewTitle] = useState('')

  const { data } = useAssignmentDetails()

  return (
    <Flex flow="row" cross="center" gap="4">
      <Link href={`/${classId}`}>
        <Button variant="flat" as="a">
          <Icon as={ChevronLeftIcon} size="lg" />
        </Button>
      </Link>
      {data && <TextField value={data.assignment.title} onChange={setNewTitle} variant="transparent" size="lg" />}
    </Flex>
  )
}

export default Header
