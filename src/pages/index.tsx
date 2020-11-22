import Head from 'next/head'
import { getSession } from 'next-auth/client'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
import { prisma } from '../../prisma'
import { useEffect } from 'react'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: React.FC<Props> = ({ redirectUrl }) => {
  useEffect(() => {
    if (redirectUrl) {
      Router.push(redirectUrl)
    }
  }, [])

  return null
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (session?.user?.email) {
    return {
      props: {
        redirectUrl: '/new',
      },
    }
  }

  return {
    props: {
      redirectUrl: '/signin',
    },
  }
}
