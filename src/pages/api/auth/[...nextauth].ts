import NextAuth, { InitOptions } from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { NextApiHandler } from 'next'
import { prisma } from '../../../../prisma'

const options: InitOptions = {
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: { user: process.env.EMAIL_SERVER_USER, pass: process.env.EMAIL_SERVER_PASSWORD },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    signIn: async (user, account, profile) => {
      if (profile.verificationRequest) {
        const exists = await prisma.user.findOne({
          where: {
            email: user.email,
          },
          select: {
            email: true,
          },
        })

        return Boolean(exists?.email)
      }

      return true
    },
  },
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/new',
  },
  adapter: Adapters.Prisma.Adapter({
    prisma,
  }),
}

const handler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default handler
