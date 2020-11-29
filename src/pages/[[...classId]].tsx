import React, { useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Router from 'next/router'
import Layout from '../parts/Layout'
import Sidebar from '../parts/Sidebar'

const Home: React.FC = () => {
  const [session, isSignedIn] = useSession()

  useEffect(() => {
    if (!isSignedIn) {
      Router.push('/auth/signin')
    }
  }, [isSignedIn])

  return (
    <Layout>
      <Sidebar />
      <main>Class page</main>
    </Layout>
  )
}

export default Home
