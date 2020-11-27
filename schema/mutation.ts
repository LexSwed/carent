import { mutationType, nonNull, stringArg } from '@nexus/schema'

export const Mutation = mutationType({
  definition(t) {
    t.field('createClass', {
      type: 'Class',
      args: {
        name: nonNull(stringArg()),
        studentGroupCode: nonNull(stringArg()),
      },
      resolve: async (_root, { name, studentGroupCode }, { prisma, session }) => {
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
