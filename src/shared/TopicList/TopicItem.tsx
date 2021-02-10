import React from 'react'
import { Button, Flex, Icon, styled, Text } from '@fxtrot/ui'
import { HiMenuAlt4 } from 'react-icons/hi'
import { Draggable } from 'react-beautiful-dnd'
import { useClassId, useTopicId } from '../../utils'
import { useRouter } from 'next/router'
import Link from 'next/link'

type FetchedTopic = GetClassTopicsQuery['class']['topics']['edges'][number]['node']
interface TopicCardProps extends FetchedTopic {
  index: number
}

export const TopicItem = React.memo<TopicCardProps>(({ id, title, index }) => {
  const classId = useClassId()
  const router = useRouter()
  const topicId = useTopicId()

  const href = `/${classId}/materials/${id}`

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <TopicCard
          as="li"
          selected={topicId === id}
          dragging={snapshot.isDragging}
          flow="row"
          cross="center"
          main="start"
          onClick={() => router.push(href)}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Button
            variant="transparent"
            size="xs"
            title="Reorder this topic"
            onClick={stopPropagation}
            {...provided.dragHandleProps}
          >
            <Icon size="sm" as={HiMenuAlt4} />
          </Button>
          <Link href={href}>
            <Button as="a" variant="transparent" size="sm">
              <Text size="sm" ellipsis>
                {title}
              </Text>
            </Button>
          </Link>
        </TopicCard>
      )}
    </Draggable>
  )
})

const TopicCard = styled(Flex, {
  'py': '$2',
  'px': '$2',
  'br': '$md',
  'cursor': 'default',
  'transition': '0.2s ease-in,',
  'transitionProperty': 'background-color, box-shadow',

  '&:hover': {
    bc: '$surfaceHover',
  },

  'variants': {
    selected: {
      true: {
        bc: '$surfaceActive',
      },
    },
    dragging: {
      true: {
        'bc': '$surfaceStill',
        'zIndex': 10,
        'shadow': '$xs',
        '&:after': {
          transform: 'scaleX(0)',
        },
      },
    },
  },
})

function stopPropagation(e) {
  e.stopPropagation()
}
