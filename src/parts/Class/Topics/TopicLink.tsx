import React from 'react'
import { Button, Flex, Icon, styled, Text } from '@fxtrot/ui'
import { HiChevronRight, HiMenuAlt4 } from 'react-icons/hi'
import type { GetClassTopicsQuery } from '../../../graphql/generated'
import { Draggable } from 'react-beautiful-dnd'

const TopicCard = styled(Flex, {
  'py': '$4',
  'px': '$2',
  'br': '$md',
  'bc': '$surfaceStill',
  'transition': '0.2s ease-in,',
  'transitionProperty': 'background-color, box-shadow',

  '&:not(:first-child:last-child)': {
    'position': 'relative',

    '&:after': {
      position: 'absolute',
      content: '""',
      bottom: 0,
      left: 0,
      width: '80%',
      height: '1px',
      bc: '$borderLight',
    },
  },

  'variants': {
    selected: {
      true: {
        bc: '$surfaceHover',
      },
    },
    dragging: {
      true: {
        'shadow': '$xs',
        '&:after': {
          display: 'none',
        },
      },
    },
  },
})

type FetchedTopic = GetClassTopicsQuery['class']['topics']['edges'][number]['node']
interface TopicCardProps extends FetchedTopic {
  onClick: (id: string) => void
  selected: boolean
  index: number
}

export const TopicLink = React.memo<TopicCardProps>(({ id, title, selected, index, onClick }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <TopicCard
          as="li"
          selected={selected}
          dragging={snapshot.isDragging}
          flow="row"
          cross="center"
          main="spread"
          onClick={() => onClick(id)}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Flex flow="row" space="$2" cross="center">
            <Button size="sm" title="Reorder this topic" onClick={stopPropagation} {...provided.dragHandleProps}>
              <Icon size="sm" as={HiMenuAlt4} />
            </Button>
            <Text size="sm">{title}</Text>
          </Flex>
          <Button variant="flat" aria-label="Show topic details">
            <Icon size="lg" as={HiChevronRight} />
          </Button>
        </TopicCard>
      )}
    </Draggable>
  )
})

function stopPropagation(e) {
  e.stopPropagation()
}
