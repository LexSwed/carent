import { interfaceType, objectType } from '@nexus/schema'

export const Node = interfaceType({
  name: 'Node',
  resolveType: () => null,
  definition(t) {
    t.nonNull.id('id', { description: 'Resource ID' })
  },
})

export const User = objectType({
  name: 'User',
  definition(t) {
    t.implements(Node)
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.image()
  },
})
