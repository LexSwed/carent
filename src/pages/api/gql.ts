import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/client'
import { schema } from '../../../schema'
import { createContext } from '../../../schema/context'

const server = new ApolloServer({
  schema,
  context: createContext,
  tracing: process.env.NODE_ENV === 'development',
  introspection: process.env.NODE_ENV === 'development',
})

const graphqlHandler = server.createHandler({ path: '/api/gql' })

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler: NextApiHandler = async (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    return graphqlHandler(req, res)
  }

  const session = await getSession({ req })

  if (!session?.user) {
    res.status(401).end()

    return
  }

  return graphqlHandler(req, res)
}

export default handler
