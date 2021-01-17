import { makeSchema, connectionPlugin, fieldAuthorizePlugin } from 'nexus'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import path from 'path'
import * as entities from './entities'
import * as scalars from './scalars'

export const schema = makeSchema({
  types: { ...scalars, ...entities },
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
      scalars: {
        DateTime: scalars.DateTime,
      },
    }),
    connectionPlugin({
      extendConnection: {
        totalCount: { type: 'Int' },
      },
    }),
    fieldAuthorizePlugin(),
  ],
  outputs: {
    schema: path.join(process.cwd(), 'schema/generated/schema.graphql'),
    typegen: path.join(process.cwd(), 'schema/generated/nexus.ts'),
  },
  contextType: { module: path.join(process.cwd(), 'schema/context.ts'), export: 'Context', alias: 'Context' },
  sourceTypes: {
    modules: [{ module: require.resolve('@prisma/client'), alias: 'prisma' }],
  },
})
