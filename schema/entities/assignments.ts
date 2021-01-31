import { idArg, inputObjectType, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
import { relayToPrismaPagination } from '../utils'

export const getClassAssignments = queryField((t) => {
  t.connectionField('assignments', {
    type: 'Assignment',
    additionalArgs: {
      classId: nonNull(
        idArg({
          description: 'ID of the Class the assignments belong to',
        })
      ),
      topicId: idArg({
        description: 'ID of the Topic the assignments belong to',
      }),
    },
    nodes: (_root, { classId, topicId, ...args }, { prisma, session }) => {
      return prisma.assignment.findMany({
        ...relayToPrismaPagination(args),
        where: {
          creatorId: session?.user.teacherId,
          topicId: topicId,
          topic: {
            classId,
            archivedAt: {
              equals: null,
            },
          },
        },
      })
    },
  })
})

export const createAssignment = mutationField((t) => {
  t.field('createAssignment', {
    type: 'Assignment',
    args: {
      name: nonNull(
        stringArg({
          description: 'Name of the assignment, e.g. "Home test" or "Control assignment"',
        })
      ),
      topicId: nonNull(
        idArg({
          description: 'ID of the topic the assignment belongs to',
        })
      ),
    },
    resolve: (_, { name, topicId }, { prisma, session }) => {
      return prisma.assignment.create({
        data: {
          name,
          state: {
            create: {},
          },
          sections: {
            create: {
              name: 'main',
            },
          },
          variants: {
            create: {
              name: 'main',
            },
          },
          creatorId: session?.user.teacherId,
          topic: {
            connect: {
              id_teacherId: {
                id: topicId,
                teacherId: session?.user.teacherId,
              },
            },
          },
        },
      })
    },
  })
})

export const topicAssignment = objectType({
  name: 'Assignment',
  definition(t) {
    t.implements('Node')
    t.model.id()
    t.model.name()
    t.model.topic()
    t.model.state({
      type: 'AssignmentState',
    })
  },
})

export const assignmentState = objectType({
  name: 'AssignmentState',
  definition(t) {
    t.implements('Node')
    t.model.id()
    t.model.open()
    t.model.openedAt()
    t.model.closedAt()
  },
})
