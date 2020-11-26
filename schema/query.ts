import { intArg, queryType } from '@nexus/schema'

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
  },
})
