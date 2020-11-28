import { mutationType, nonNull, stringArg } from '@nexus/schema'
import { ApolloError } from 'apollo-server-micro'

export const Mutation = mutationType({
  definition(t) {
    t.field('createClass', {
      type: 'Class',
      args: {
        name: nonNull(stringArg()),
        studentGroupCode: nonNull(stringArg()),
      },
      resolve: async (_root, { name, studentGroupCode }, { prisma, session }) => {
        if (name === '') {
          throw new ApolloError('Class name cannot be empty')
        }
        if (studentGroupCode === '') {
          throw new ApolloError('Student group code cannot be empty')
        }
        const teacher = await prisma.teacher.findFirst({
          where: {
            user: {
              email: session.user.email,
            },
          },
          select: {
            id: true,
          },
        })
        return prisma.class.create({
          data: {
            name,
            teacher: {
              connect: {
                id: teacher.id,
              },
            },
            studentGroup: {
              create: {
                code: studentGroupCode,
              },
            },
          },
        })
      },
    })
  },
})
