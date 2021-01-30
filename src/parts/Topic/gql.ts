import { gql, useMutation, useQuery } from '@apollo/client'
import { useCallback, useState } from 'react'
import { useClassId, useTopicId } from '../../utils'
import { scrapData } from '../../utils/link-preview'

export const updateOrderMutation = gql`
  mutation updateTopicOrder($id: ID!, $before: ID, $after: ID) {
    reorderTopic(id: $id, before: $before, after: $after) {
      id
      title
    }
  }
`

export const getTopics = gql`
  query getClassTopics($classId: ID!) {
    class(id: $classId) {
      id
      name
      topics(first: 30) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
`
export function useClassTopics() {
  const classId = useClassId()
  return useQuery<GetClassTopicsQuery, GetClassTopicsQueryVariables>(getTopics, {
    variables: {
      classId,
    },
  })
}

const getTopicDetails = gql`
  query getTopicDetails($id: ID!) {
    topic(id: $id) {
      id
      title
    }
  }
`

export function useTopicDetails() {
  const topicId = useTopicId()
  return useQuery<GetTopicDetailsQuery, GetTopicDetailsQueryVariables>(getTopicDetails, {
    variables: {
      id: topicId,
    },
  })
}

const updateTopic = gql`
  mutation updateTopic($id: ID!, $title: String) {
    updateTopic(id: $id, title: $title) {
      id
    }
  }
`
export function useUpdateTopic() {
  return useMutation<UpdateTopicMutation, UpdateTopicMutationVariables>(updateTopic)
}

const deleteTopic = gql`
  mutation deleteTopic($id: ID!) {
    deleteTopic(id: $id) {
      id
    }
  }
`

export function useDeleteTopic() {
  const topicId = useTopicId()

  return useMutation<DeleteTopicMutation, DeleteTopicMutationVariables>(deleteTopic, {
    variables: { id: topicId },
    update(cache, { data: { deleteTopic } }) {
      cache.evict({ id: cache.identify(deleteTopic) })
      cache.gc()
    },
  })
}

const updateTopicTitle = gql`
  mutation updateTopicTitle($id: ID!, $title: String!) {
    updateTopic(id: $id, title: $title) {
      id
      title
    }
  }
`
export function useOnBlurUpdateTopicTitle() {
  const topicId = useTopicId()
  const { data } = useTopicDetails()

  const [update] = useMutation<UpdateTopicTitleMutation, UpdateTopicTitleMutationVariables>(updateTopicTitle)

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const title = e.target.value

      if (data?.topic.title === title) {
        return null
      }

      update({
        variables: {
          id: topicId,
          title,
        },
      })
    },
    [data?.topic.title, topicId, update]
  )

  return handleBlur
}

const getTopicAttachments = gql`
  query getTopicAttachments($id: ID!) {
    topic(id: $id) {
      id
      attachments(first: 20) {
        edges {
          node {
            id
            href
            name
          }
        }
      }
    }
  }
`

export function useTopicAttachments() {
  const topicId = useTopicId()

  return useQuery<GetTopicAttachmentsQuery, GetTopicAttachmentsQueryVariables>(getTopicAttachments, {
    variables: {
      id: topicId,
    },
  })
}

const addTopicAttachment = gql`
  mutation addTopicAttachment($topicId: ID!, $data: TopicAttachmentInput!) {
    addTopicAttachment(topicId: $topicId, data: $data) {
      id
      href
      name
    }
  }
`

export function useAddTopicAttachment() {
  const topicId = useTopicId()
  const [href, setHref] = useState('')

  const [mutation, info] = useMutation<AddTopicAttachmentMutation, AddTopicAttachmentMutationVariables>(
    addTopicAttachment,
    {
      update(cache, { data: { addTopicAttachment } }) {
        cache.modify({
          id: cache.identify({
            __typename: 'Topic',
            id: topicId,
          }),
          fields: {
            attachments: (attachmentsConnection) => {
              const newAttachmentNodeRef = cache.writeFragment({
                data: addTopicAttachment,
                fragment: gql`
                  fragment NewLink on TopicAttachment {
                    id
                    href
                    name
                  }
                `,
              })
              return {
                ...attachmentsConnection,
                edges: [
                  {
                    __typename: 'TopicAttachmentEdge',
                    node: newAttachmentNodeRef,
                  },
                  ...attachmentsConnection.edges,
                ],
              }
            },
          },
        })
      },
    }
  )

  const createLink = async () => {
    const data = await scrapData(href)

    if (!data?.title) {
      data.title = href
    }

    await mutation({
      variables: {
        topicId,
        data: {
          href,
          name: data.title.trim(),
        },
      },
    })
    setHref('')
  }

  return [{ value: href, onChange: setHref }, [createLink, info]] as const
}

const renameTopicAttachment = gql`
  mutation renameTopicAttachment($id: ID!, $name: String!) {
    renameTopicAttachment(id: $id, name: $name) {
      id
      name
    }
  }
`

export function useRenameTopicAttachment() {
  return useMutation<RenameTopicAttachmentMutation, RenameTopicAttachmentMutationVariables>(renameTopicAttachment)
}

export const deleteTopicAttachment = gql`
  mutation deleteTopicAttachment($id: ID!) {
    deleteTopicAttachment(id: $id) {
      id
    }
  }
`

export function useDeleteTopicAttachment(id: string) {
  return useMutation<DeleteTopicAttachmentMutation, DeleteTopicAttachmentMutationVariables>(deleteTopicAttachment, {
    variables: {
      id,
    },
    update(cache, { data: { deleteTopicAttachment } }) {
      cache.evict({ id: cache.identify(deleteTopicAttachment) })
      cache.gc()
    },
  })
}
