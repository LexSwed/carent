import { objectType, queryField } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.implements('Node')
    t.model.id({})
    t.model.name()
    t.model.email()
    t.model.image()
  },
})

export const userQueryTypes = queryField((t) => {
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
})
