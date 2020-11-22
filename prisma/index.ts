import { PrismaClient } from '@prisma/client'

// to prevent Next hot reload from recreating connections: https://github.com/prisma/prisma/issues/1983#issuecomment-620621213
export let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!(global as any).prisma) {
    ;(global as any).prisma = new PrismaClient()
  }

  prisma = (global as any).prisma
}
