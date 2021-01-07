import React from 'react'
import { getSession } from 'next-auth/client'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Layout from '../parts/Layout'
import Sidebar from '../parts/Class/Sidebar'
import ClassPage from '../parts/Class'

const Home: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ redirectUrl }) => {
  return (
    <Layout>
      <Sidebar />
      <ClassPage />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (!session) {
    ctx.res.writeHead(302, { Location: '/auth/signin' })
    ctx.res.end()

    return {
      props: {
        redirectUrl: '/auth/signin',
      },
    }
  }
  return {
    props: {
      redirectUrl: null,
    },
  }
}

export default Home
