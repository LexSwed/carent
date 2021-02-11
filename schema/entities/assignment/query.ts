import { queryField, nonNull, idArg } from 'nexus'
import { relayToPrismaPagination } from '../../utils'

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

export const getAssignmentById = queryField((t) => {
  t.field('assignment', {
    type: 'Assignment',
    args: {
      id: nonNull(
        idArg({
          description: 'ID of the assignment',
        })
      ),
    },
    resolve: (_root, { id }, { prisma, session }) => {
      return prisma.assignment.findUnique({
        where: {
          id_creatorId: {
            id,
            creatorId: session?.user.teacherId,
          },
        },
      })
    },
  })
})
