import { interfaceType, objectType } from '@nexus/schema'
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
      type: Topic,
      totalCount: (root: any, args, { prisma }) => prisma.topic.count({ where: root.id }),
      nodes: (root, args, { prisma }) => {
        return prisma.topic.findMany({
          ...relayToPrismaPagination(args),
          where: {
            classId: root.id,
          },
        })
      },
    })
  },
})
