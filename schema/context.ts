import type { PrismaClient } from '@prisma/client'
import type { NextPageContext } from 'next'
import { getSession, Session } from 'next-auth/client'
import { prisma } from '../prisma'

export interface Context {
  prisma: PrismaClient
  session: Session
}

export async function createContext(context: NextPageContext): Promise<Context> {
  const session = await getSession(context)

  return { prisma: prisma, session }
}
