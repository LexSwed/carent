import { objectType, queryField } from 'nexus'
import { relayToPrismaPagination } from '../utils'

export const getStudentGroups = queryField((t) => {
  t.connectionField('groups', {
    type: 'StudentGroup',
    totalCount: (root, args, { session, prisma }) => {
      return prisma.studentGroup.count({
        where: {
          classes: {
            some: {
              teacher: {
                user: {
                  workspaceId: session.user.workspaceId,
                },
              },
            },
          },
        },
      })
    },
    nodes: (root, args, { session, prisma }) => {
      return prisma.studentGroup.findMany({
        ...relayToPrismaPagination(args),
        where: {
          classes: {
            some: {
              teacher: {
                user: {
                  workspaceId: session.user.workspaceId,
                },
              },
            },
          },
        },
      })
    },
  })
})

export const StudentGroup = objectType({
  name: 'StudentGroup',
  definition(t) {
    t.implements('Node')
    t.model.id()
    t.model.code()
  },
})
