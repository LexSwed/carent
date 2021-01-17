import { ApolloError } from 'apollo-server-micro'
import { arg, enumType, idArg, inputObjectType, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
import { relayToPrismaPagination } from '../utils'

export const sortTopicsInput = enumType({
  name: 'ClassTopicsOrder',
  members: {
    ORDER_ASC: 'orderKey_asc',
    ORDER_DESC: 'orderKey_desc',
    UPDATED_ASC: 'updatedAt_asc',
    UPDATED_DESC: 'updatedAt_desc',
  },
})

export const getTechingClasses = queryField((t) => {
  t.connectionField('classes', {
    type: 'Class',
    totalCount: (root, args, { session, prisma }) => {
      return prisma.class.count({
        where: {
          teacher: {
            user: {
              email: session?.user?.email,
            },
          },
        },
      })
    },
    nodes: (root, args, { session, prisma }) => {
      return prisma.class.findMany({
        ...relayToPrismaPagination(args),
        where: {
          teacher: {
            user: {
              email: session?.user?.email,
            },
          },
        },
      })
    },
  })
})

export const getClassById = queryField((t) => {
  t.field('class', {
    type: 'Class',
    args: {
      id: nonNull(idArg()),
    },
    resolve: (_, { id }, { prisma, session }) => {
      return prisma.class.findFirst({
        where: {
          id,
          AND: {
            teacher: {
              userId: session.user.id,
            },
          },
        },
      })
    },
  })
})

export const studentGroup = inputObjectType({
  name: 'CreateClassGroupInput',
  definition(t) {
    t.string('id')
    t.string('code')
  },
})

export const createClass = mutationField((t) => {
  t.field('createClass', {
    type: 'Class',
    args: {
      name: nonNull(stringArg()),
      group: nonNull(studentGroup),
    },
    resolve: async (_root, { name, group }, { prisma, session }) => {
      const teacher = await prisma.teacher.findUnique({
        where: {
          userId: session.user.id,
        },
        select: { id: true },
      })
      try {
        const result = await prisma.class.create({
          data: {
            name,
            teacher: {
              connect: {
                id: teacher.id,
              },
            },
            studentGroup: group.id
              ? {
                  connect: {
                    id: group.id,
                  },
                }
              : {
                  create: {
                    code: group.code,
                  },
                },
          },
        })

        return result
      } catch (error) {
        throw new Error(error.message)
      }
    },
  })
})

export const updateClassName = mutationField((t) => {
  t.field('updateClassName', {
    type: 'Class',
    args: {
      id: nonNull(idArg()),
      name: nonNull('String'),
    },
    resolve: async (_, { id, name }, { prisma, session }) => {
      try {
        const classBelongsToUser = await prisma.class.findFirst({
          where: {
            id,
            AND: {
              teacher: {
                userId: session?.user?.id,
              },
            },
          },
          select: {
            id: true,
          },
        })
        if (classBelongsToUser) {
          return prisma.class.update({
            where: {
              id,
            },
            data: {
              name,
            },
          })
        } else {
          throw new ApolloError('Failed to update the name of the class', '400')
        }
      } catch (error) {
        throw new ApolloError('Failed to update the name of the class', '400')
      }
    },
  })
})

export const Class = objectType({
  name: 'Class',
  definition(t) {
    t.implements('Node')
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
            archivedAt: {
              equals: null,
            },
          },
        })
      },
    })
  },
})
