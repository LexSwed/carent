import React from 'react'
import { Button, Flex, Icon, Box, styled, Text, StyleRecord } from '@fxtrot/ui'
import { HiChevronRight, HiMenuAlt4 } from 'react-icons/hi'
import type { GetClassTopicsQuery } from '../../../graphql/generated'
import { Draggable } from 'react-beautiful-dnd'

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
          main="start"
          space="$2"
          onClick={() => onClick(id)}
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
          <Button variant="transparent" size="sm" ellipsis>
            {title}
          </Button>
          {selected && <Icon size="lg" as={HiChevronRight} css={style.icon} />}
        </TopicCard>
      )}
    </Draggable>
  )
})

const style: StyleRecord = {
  icon: {
    ml: 'auto',
  },
}

const TopicCard = styled(Flex, {
  'py': '$2',
  'px': '$2',
  'br': '$md',
  'cursor': 'default',
  'transition': '0.2s ease-in,',
  'transitionProperty': 'background-color, box-shadow',

  '&:hover': {
    bc: '$flatHover',
  },

  'variants': {
    selected: {
      true: {
        bc: '$flatActive',
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
