import type { PrismaClient } from '@prisma/client'
import type { NextApiRequest } from 'next'
import { getSession, Session } from 'next-auth/client'
import { prisma } from '../prisma'

export interface Context {
  prisma: PrismaClient
  session: Session
}

export async function createContext({ req }: { req: NextApiRequest }): Promise<Context> {
  const session = await getSession({ req })

  return { prisma: prisma, session }
}
