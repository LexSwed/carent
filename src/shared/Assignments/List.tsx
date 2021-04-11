import React, { useRef } from 'react'
import { Box, Flex, Text, Heading, Popover, TextLink, Tag, styled, Button } from '@fxtrot/ui'
import Link from 'next/link'
import Router from 'next/router'

import { CreateNewAssignment } from './CreateNew'
import { useClassId } from '../../utils'

interface ListProps {
  topicId: string
  edges: GetAssignmentsQuery['assignments']['edges']
}
const AssignmentsList: React.FC<ListProps> = ({ topicId, edges }) => {
  const ref = useRef(null)
  const classId = useClassId()

  return (
    <Flex gap="4">
      <Flex flow="row" main="space-between" cross="center">
        <Heading level={3}>Assignments</Heading>
        <Popover ref={ref}>
          <Button size="sm" variant="primary">
            Create new
          </Button>
          <Popover.Content css={{ width: 300 }}>
            <CreateNewAssignment selectedTopic={topicId} onCreate={() => ref.current?.close()} />
          </Popover.Content>
        </Popover>
      </Flex>
      <Flex gap="4">
        {edges.map((edge) => {
          return <Assignment key={edge.node.id} {...edge.node} href={`/${classId}/assignments/${edge.node.id}`} />
        })}
      </Flex>
    </Flex>
  )
}

export default AssignmentsList

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
  title,
  description,
  state,
  topic,
  href,
}) => {
  return (
    <Tile key={id} onClick={() => Router.push(href)}>
      <Flex flow="row" gap="4" main="space-between">
        <Link href={href}>
          <TextLink size="lg" css={{ color: '$text' }} href={href} as="a">
            {title}
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
