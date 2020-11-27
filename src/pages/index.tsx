import React, { useEffect } from 'react'
import { getSession } from 'next-auth/client'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
import Layout from '../parts/Layout'
import Sidebar from '../parts/Sidebar'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: React.FC<Props> = ({ redirectUrl }) => {
  useEffect(() => {
    if (redirectUrl) {
      Router.push(redirectUrl)
    }
  }, [redirectUrl])

  return (
    <Layout>
      <Sidebar />
      <main>Main</main>
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<{ redirectUrl?: string }> = async ({ req }) => {
  const session = await getSession({ req })

  if (!session?.user?.email) {
    return {
      props: {
        redirectUrl: '/auth/signin',
      },
    }
  }

  return {
    props: {},
  }
}
