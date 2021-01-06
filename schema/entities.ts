import { arg, enumType, inputObjectType, interfaceType, objectType } from 'nexus'
import { relayToPrismaPagination } from './utils'

export const Node = interfaceType({
  name: 'Node',
  resolveType: () => null,
  definition(t) {
    t.nonNull.string('id', { description: 'Resource ID' })
  },
})

export const User = objectType({
  name: 'User',
  definition(t) {
    t.implements(Node)
    t.model.id({})
    t.model.name()
    t.model.email()
    t.model.image()
  },
})

export const Topic = objectType({
  name: 'Topic',
  definition(t) {
    t.implements(Node)
    t.model.id()
    t.model.title()
    t.model.description()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

export const StudentGroup = objectType({
  name: 'StudentGroup',
  definition(t) {
    t.implements(Node)
    t.model.id()
    t.model.code()
  },
})

export const sortTopicsInput = enumType({
  name: 'ClassTopicsOrder',
  members: {
    ORDER_ASC: 'orderKey_asc',
    ORDER_DESC: 'orderKey_desc',
    UPDATED_ASC: 'updatedAt_asc',
    UPDATED_DESC: 'updatedAt_desc',
  },
})

export const Class = objectType({
  name: 'Class',
  definition(t) {
    t.implements(Node)
    t.model.id()
    t.model.name()
    t.model.studentGroup({
      alias: 'group',
    })
    t.connectionField('topics', {
      type: 'Topic',
      additionalArgs: {
        sort: arg({
          type: inputObjectType({
            name: 'ClassTopicsSortOrder',
            definition(t) {
              t.field('key', {
                type: enumType({ name: 'TopicSortKey', members: { ORDER: 'orderKey', UPDATED: 'updatedAt' } }),
              })
              t.field('order', {
                type: enumType({
                  name: 'TopicSortOrder',
                  description:
                    'Sort direction, ASC = ascending (normal - latest on top), DESC = descending (reverse - oldest on top)',
                  members: { ASC: 'asc', DESC: 'desc' },
                }),
              })
            },
          }),
          default: {
            key: 'orderKey',
            order: 'asc',
          },
        }),
      },
      totalCount: (root: any, args, { prisma }) => prisma.topic.count({ where: root.id }),
      nodes: (root, { sort, ...args }, { prisma }) => {
        return prisma.topic.findMany({
          ...relayToPrismaPagination(args),
          orderBy: {
            [sort.key]: sort.order,
          },
          where: {
            classId: root.id,
          },
        })
      },
    })
  },
})
