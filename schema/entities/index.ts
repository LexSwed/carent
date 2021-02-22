import { interfaceType } from 'nexus'

export * from './assignment'
export * from './class'
export * from './student-group'
export * from './topic'
export * from './user'

export const Node = interfaceType({
  name: 'Node',
  resolveType: () => null,
  definition(t) {
    t.nonNull.string('id', {
      description: 'Resource ID',
      // resolve: ({ id }: any, args, ctx, info) => Buffer.from(`${info.parentType}:${id}`).toString('base64'),
    })
  },
})
