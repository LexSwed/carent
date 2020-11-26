import { intArg, queryType } from '@nexus/schema'
import { relayToPrismaPagination } from './utils'

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve: (root, args, { prisma, session }) => {
        return prisma.user.findUnique({
          where: {
            email: session?.user?.email,
          },
        })
      },
    })

    t.connectionField('classes', {
      type: 'Class',
      totalCount: (root, args, { session, prisma }) => {
        return prisma.class.count({
          where: {
            teacher: {
              user: {
                email: session?.user?.email,
              },
            },
          },
        })
      },
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
  },
})
