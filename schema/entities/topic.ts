import { ApolloError } from 'apollo-server-micro'
import { idArg, inputObjectType, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
import { LexoRank } from 'lexorank'
import { relayToPrismaPagination } from '../utils'
import type { Topic as PrismaTopic, TopicAttachment as PrismaTopicAttachment } from '@prisma/client'
import type { Context } from 'nexus-plugin-prisma/dist/utils'

export const getTopicById = queryField((t) => {
  t.field('topic', {
    type: 'Topic',
    args: {
      id: nonNull(idArg()),
    },
    resolve: (_, { id }, { prisma, session }) => {
      return prisma.topic.findFirst({
        where: {
          id,
          teacherId: session?.user?.teacherId,
          AND: {
            archivedAt: {
              equals: null,
            },
          },
        },
      })
    },
  })
})

export const createNewTopic = mutationField((t) => {
  t.field('createTopic', {
    type: 'Topic',
    args: {
      classId: nonNull(
        idArg({
          description: 'ID of the class create topic into',
        })
      ),
      title: nonNull('String'),
    },
    resolve: async (_root, { title, classId }, { prisma, session }) => {
      try {
        const topic = await prisma.topic.findFirst({
          where: { classId, AND: { teacherId: session?.user?.teacherId } },
          orderBy: { orderKey: 'asc' },
          select: { orderKey: true },
        })
        const orderKey = topic ? LexoRank.parse(topic.orderKey).genPrev().toString() : LexoRank.middle().toString()

        return prisma.topic.create({
          data: {
            title,
            creator: {
              connect: {
                id: session?.user?.teacherId,
              },
            },
            orderKey,
            class: {
              connect: {
                id: classId,
              },
            },
          },
        })
      } catch (error) {
        throw new ApolloError('Failed to create new topic for the class', '400')
      }
    },
  })
})

export const reorderTopic = mutationField((t) => {
  t.field('reorderTopic', {
    type: 'Topic',
    args: {
      id: nonNull(idArg({ description: 'ID of the topic to reorder' })),
      before: idArg({ description: 'ID of the topic to insert before' }),
      after: idArg({ description: 'ID of the topic to insert after' }),
    },
    authorize: (_, { id }, ctx) => canUpdateTopic(id, ctx),
    resolve: async (_root, { id, before, after }, { prisma, session }) => {
      const referenceId = before || after

      if (!id) {
        throw new ApolloError('Neither before ID not after ID was not provided', '400')
      }

      const referenceItem = await prisma.topic.findFirst({
        where: {
          id: referenceId,
          teacherId: session?.user?.teacherId,
          archivedAt: {
            equals: null,
          },
        },
        select: {
          orderKey: true,
        },
      })

      if (!referenceItem) {
        throw new ApolloError(`${before ? "'before'" : "'after'"} argument is not correct`, '400')
      }

      const referenceKey = LexoRank.parse(referenceItem.orderKey)
      const orderKey = before ? referenceKey.genPrev().toString() : referenceKey.genNext().toString()

      return prisma.topic.update({
        where: {
          id: id,
        },
        data: {
          orderKey,
        },
      })
    },
  })
})

export const updateTopicTitleAndContent = mutationField((t) => {
  t.field('updateTopic', {
    type: 'Topic',
    args: {
      id: nonNull(
        idArg({
          description: 'ID of the topic',
        })
      ),
      title: 'String',
    },
    authorize: (_, { id }, ctx) => canUpdateTopic(id, ctx),
    resolve: async (_root, { id, title }, { prisma, session }) => {
      try {
        return prisma.topic.update({
          where: {
            id,
            id_teacherId: {
              id,
              teacherId: session?.user?.teacherId,
            },
          },
          data: {
            title,
            updatedAt: new Date(),
          },
        })
      } catch (error) {
        throw new ApolloError('Topic with specified ID not found', '400')
      }
    },
  })
})

export const deleteTopic = mutationField((t) => {
  t.field('deleteTopic', {
    type: 'Topic',
    args: {
      id: nonNull(
        idArg({
          description: 'ID of the topic to delete',
        })
      ),
    },
    authorize: (_, { id }, ctx) => canUpdateTopic(id, ctx),
    resolve: async (_root, { id }, { prisma, session }) => {
      return prisma.topic.update({
        where: {
          id,
        },
        data: {
          archivedAt: new Date(),
        },
      })
    },
  })
})

export const addAttachment = mutationField((t) => {
  t.field('addTopicAttachment', {
    type: TopicAttachment,
    args: {
      topicId: nonNull(idArg()),
      data: nonNull(
        inputObjectType({
          name: 'TopicAttachmentInput',
          definition(t) {
            t.nonNull.string('href', { description: 'Reference to the attachment' })
            t.nonNull.string('name', { description: 'Name of the attachment' })
          },
        })
      ),
    },
    authorize: (_, { topicId }, ctx) => canUpdateTopic(topicId, ctx),
    resolve: (_, { topicId, data }, { prisma }) => {
      return prisma.topicAttachment.create({
        data: {
          href: data.href,
          name: data.name,
          topic: {
            connect: {
              id: topicId,
            },
          },
        },
      })
    },
  })
})

export const renameAttachment = mutationField((t) => {
  t.field('renameTopicAttachment', {
    type: TopicAttachment,
    args: {
      id: nonNull(
        idArg({
          description: 'Attachment ID',
        })
      ),
      name: nonNull(
        stringArg({
          description: 'New name for the attachment',
        })
      ),
    },
    authorize: (_, { id }, ctx) => canUpdateAttachment(id, ctx),
    resolve: (_, { id, name }, { prisma }) => {
      return prisma.topicAttachment.update({
        where: {
          id,
        },
        data: {
          name,
        },
      })
    },
  })
})

export const deleteAttachment = mutationField((t) => {
  t.field('deleteTopicAttachment', {
    type: TopicAttachment,
    args: {
      id: nonNull(
        idArg({
          description: 'Attachment ID',
        })
      ),
    },
    authorize: (_, { id }, ctx) => canUpdateAttachment(id, ctx),
    resolve: (_, { id }, { prisma }) => {
      return prisma.topicAttachment.delete({
        where: {
          id,
        },
      })
    },
  })
})

export const Topic = objectType({
  name: 'Topic',
  definition(t) {
    t.implements('Node')
    t.model.id()
    t.model.title()
    t.model.createdAt()
    t.model.updatedAt()
    t.connectionField('attachments', {
      type: TopicAttachment,
      totalCount: (root: any, args, { prisma }) =>
        prisma.topicAttachment.count({
          where: {
            topicId: root.id,
          },
        }),
      nodes: (root, args, { prisma }) => {
        return prisma.topicAttachment.findMany({
          ...relayToPrismaPagination(args),
          orderBy: {
            createdAt: 'desc',
          },
          where: {
            topicId: root.id,
          },
        })
      },
    })
  },
})

export const TopicAttachment = objectType({
  name: 'TopicAttachment',
  definition(t) {
    t.model.id()
    t.model.href()
    t.model.name()
  },
})

async function canUpdateTopic(topicId: PrismaTopic['id'], { prisma, session }: Context) {
  const topic = await prisma.topic.findFirst({
    where: {
      id: topicId,
      teacherId: session?.user?.teacherId,
      archivedAt: {
        equals: null,
      },
    },
    select: {
      id: true,
    },
  })
  return !!topic
}

async function canUpdateAttachment(id: PrismaTopicAttachment['id'], { prisma, session }: Context) {
  const topic = await prisma.topicAttachment.findFirst({
    where: {
      id,
      topic: {
        teacherId: session?.user?.teacherId,
        archivedAt: {
          equals: null,
        },
      },
    },
    select: {
      id: true,
    },
  })
  return !!topic
}
