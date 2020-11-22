import { interfaceType, objectType } from '@nexus/schema'

export const Node = interfaceType({
  name: 'Node',
  definition(t) {
    t.int('id', { nullable: false, description: 'Resource ID' })
    t.resolveType(() => null)
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
