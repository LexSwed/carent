import React, { useCallback } from 'react'
import { useApolloClient } from '@apollo/client'
import { Flex, styled } from '@fxtrot/ui'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { updateOrderMutation, getTopics } from './gql'
import { useClassId } from '../../utils'

export const Topics = ({ children }) => {
  const handleDrop = useOnDrop()
  return (
    <DragDropContext onDragEnd={handleDrop}>
      <Droppable droppableId="topics">
        {(provided) => (
          <List as="ul" {...provided.droppableProps} ref={provided.innerRef} gap="1">
            {children}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const List = styled(Flex, {
  p: 0,
  margin: 0,
  overflow: 'auto',
})

function useOnDrop() {
  const { cache, mutate } = useApolloClient()
  const classId = useClassId()

  return useCallback<React.ComponentProps<typeof DragDropContext>['onDragEnd']>(
    (result) => {
      if (!result.destination || result.source.index === result.destination.index) return null

      const currentClass = cache.identify({
        __typename: 'Class',
        id: classId,
      })
      const {
        class: { topics },
      } = cache.readQuery<GetClassTopicsQuery, GetClassTopicsQueryVariables>({
        query: getTopics,
        variables: {
          classId,
        },
      })
      const reference = topics.edges[result.destination.index].node

      cache.modify({
        id: currentClass,
        fields: {
          topics(existingTopics = {}) {
            return {
              ...existingTopics,
              edges: reorder(existingTopics.edges, result.source.index, result.destination.index),
            }
          },
        },
      })

      mutate({
        mutation: updateOrderMutation,
        variables: {
          id: result.draggableId,
          ...(result.source.index > result.destination.index ? { before: reference.id } : { after: reference.id }),
        },
      })
    },
    [cache, classId, mutate]
  )
}

function reorder<L extends any[]>(list: L, startIndex: number, endIndex: number): L {
  const result = Array.from(list) as L
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
