import { inputObjectType, mutationType, nonNull, stringArg } from '@nexus/schema'
import { ApolloError } from 'apollo-server-micro'

const studentGroup = inputObjectType({
  name: 'CreateClassGroupInput',
  definition(t) {
    t.string('id')
    t.string('code')
  },
})

export const Mutation = mutationType({
  definition(t) {
    t.field('createClass', {
      type: 'Class',
      args: {
        name: nonNull(stringArg()),
        group: nonNull(studentGroup),
      },
      resolve: async (_root, { name, group }, { prisma, session }) => {
        return prisma.class.create({
          data: {
            name,
            teacher: {
              connect: {
                id: session.user.id,
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
      },
    })
  },
})
