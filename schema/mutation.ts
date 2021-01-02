import { inputObjectType, mutationType, nonNull, stringArg } from 'nexus'
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

    t.field('createTopic', {
      type: 'Topic',
      args: {
        classId: nonNull('String'),
        title: nonNull('String'),
      },
      resolve: async (_root, { title, classId }, { prisma, session }) => {
        const teacherClass = await prisma.class.findFirst({
          where: {
            id: classId,
            teacher: {
              userId: session?.user?.id,
            },
          },
          select: {
            id: true,
          },
        })

        if (!teacherClass) {
          throw new ApolloError('Failed to create new topic for the class', '404')
        }

        return await prisma.topic.create({
          data: {
            title,
            class: {
              connect: {
                id: teacherClass.id,
              },
            },
          },
        })
      },
    })
  },
})
