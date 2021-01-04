import { inputObjectType, mutationType, nonNull, stringArg } from 'nexus'
import { ApolloError } from 'apollo-server-micro'
import { LexoRank } from 'lexorank'

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

    t.field('updateClassName', {
      type: 'Class',
      args: {
        id: nonNull('String'),
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

    t.field('createTopic', {
      type: 'Topic',
      args: {
        classId: nonNull('String'),
        title: nonNull('String'),
      },
      /** I decided that having two consequent DB transactions is better than parallel if one fails */
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
          throw new ApolloError('Failed to create new topic for the class', '400')
        }

        const topic = await prisma.topic.findFirst({
          where: { classId },
          orderBy: { orderKey: 'asc' },
          select: { orderKey: true },
        })
        const orderKey = topic ? LexoRank.parse(topic.orderKey).genPrev().toString() : LexoRank.middle().toString()

        return prisma.topic.create({
          data: {
            title,
            orderKey,
            class: {
              connect: {
                id: teacherClass.id,
              },
            },
          },
        })
      },
    })

    /** This code chunk seem slow (at least 3 DB requests), but it's not the worst */
    t.field('reorderTopic', {
      type: 'Topic',
      args: {
        id: nonNull(stringArg({ description: 'ID of the topic to reorder' })),
        before: stringArg({ description: 'ID of the topic to insert before' }),
        after: stringArg({ description: 'ID of the topic to insert after' }),
      },
      resolve: async (_root, { id, before, after }, { prisma, session }) => {
        const referenceId = before || after

        if (!id) {
          throw new ApolloError('Neither before ID not after ID was not provided', '400')
        }

        const referenceItem = await prisma.topic.findFirst({
          where: {
            id: referenceId,
            AND: {
              class: {
                teacher: {
                  userId: session.user.id,
                },
              },
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
  },
})
