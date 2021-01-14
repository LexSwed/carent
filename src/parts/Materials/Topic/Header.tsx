import React from 'react'
import { Button, Flex, Icon, Spinner } from '@fxtrot/ui'
import { useTopicId } from '../../../utils'
import { HiCheck, HiOutlineTrash } from 'react-icons/hi'
import type { ValuesOfCorrectTypeRule } from 'graphql'

const Header: React.FC = () => {
  const topicId = useTopicId()
  const loading = true

  return (
    <Flex space="$4" flow="row" main="end">
      {loading ? (
        <Button size="sm" aria-label="Saving the updates" variant="flat" disabled>
          <Spinner size="sm" />
          <span>Saving</span>
        </Button>
      ) : (
        <Button size="sm" aria-label="Updates are saved" variant="flat" disabled>
          <Icon size="md" as={HiCheck} />
          <span>Saved</span>
        </Button>
      )}
      <Button size="sm" aria-label="Delete the document" variant="flat">
        <Icon size="md" as={HiOutlineTrash} />
      </Button>
    </Flex>
  )
}

export default Header
