import { idArg, nonNull, objectType, queryField } from 'nexus'
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
