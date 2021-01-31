import React from 'react'
import { Flex, Box, Text, Tag, styled, TextLink } from '@fxtrot/ui'
import Link from 'next/link'
import Router from 'next/router'

import { useClassId } from '../../../utils'

const List: React.FC<{ edges: GetAssignmentsQuery['assignments']['edges'] }> = ({ edges }) => {
  const classId = useClassId()
  return (
    <Flex space="$4">
      {edges.map((edge) => {
        return <Assignment key={edge.node.id} {...edge.node} href={`/${classId}/assignments/${edge.node.id}`} />
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

const Assignment: React.FC<GetAssignmentsQuery['assignments']['edges'][number]['node'] & { href: string }> = ({
  id,
  name,
  description,
  state,
  topic,
  href,
}) => {
  return (
    <Tile key={id} onClick={() => Router.push(href)}>
      <Flex flow="row" space="$4" main="spread">
        <Link href={href}>
          <TextLink size="lg" css={{ color: '$text' }} href={href} as="a">
            {name}
          </TextLink>
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
}
