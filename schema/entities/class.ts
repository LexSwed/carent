import { ApolloError } from 'apollo-server-micro'
import { enumType, idArg, inputObjectType, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
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
      return prisma.class.findUnique({
        where: {
          id_teacherId: {
            id,
            teacherId: session?.user?.teacherId,
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
      try {
        const result = await prisma.class.create({
          data: {
            name,
            teacher: {
              connect: {
                id: session?.user?.teacherId,
              },
            },
            // NB!: connectOrCreate with where.id === undefined is not handled by prisma
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
        return prisma.class.update({
          where: {
            id_teacherId: {
              id,
              teacherId: session?.user?.teacherId,
            },
          },
          data: {
            name,
          },
        })
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
  },
})
