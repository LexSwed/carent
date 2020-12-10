import 'next-auth'

declare module 'next-auth' {
  type PrismaUser = import('@prisma/client').User
  export interface User {
    name?: PrismaUser['name'] | null
    email?: PrismaUser['email'] | null
    image?: PrismaUser['image'] | null
    id?: PrismaUser['id'] | null
    workspaceId?: PrismaUser['workspaceId'] | null
  }
}
