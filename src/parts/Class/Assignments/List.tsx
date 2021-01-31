import React from 'react'
import { Flex, Box, Text, Tag, styled } from '@fxtrot/ui'
import Link from 'next/link'
import { useClassId } from '../../../utils'

const List: React.FC<{ edges: GetAssignmentsQuery['assignments']['edges'] }> = ({ edges }) => {
  const classId = useClassId()
  return (
    <Flex space="$4">
      {edges.map((edge) => {
        const { id, name, description, state, topic } = edge.node
        return (
          <Tile key={id}>
            <Flex flow="row" space="$4" main="spread">
              <Link href={`/${classId}/assignment/${id}`}>
                <Text size="lg" as="a">
                  {name}
                </Text>
              </Link>
              {state.open ? <Tag label="OPEN" variant="outline" /> : null}
            </Flex>
            <Text size="sm" as="p">
              {description}
            </Text>
            <Text size="xs">{topic.title}</Text>
            <Box pt="$4" />
            <Flex flow="row" main="end">
              <Text tone="light" size="xs">
                No results yet
              </Text>
            </Flex>
          </Tile>
        )
      })}
    </Flex>
  )
}

export default List

const Tile = styled('div', {
  'p': '$4',
  'br': '$lg',
  'bc': '$primaryLight',
  'transition': 'background-color 0.2s ease-in-out',
  'cursor': 'default',
  '&:hover': {
    bc: '$primaryLightActive',
  },
})
