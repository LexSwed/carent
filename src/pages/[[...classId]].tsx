import React, { useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Router from 'next/router'
import Layout from '../parts/Layout'
import Sidebar from '../parts/Sidebar'
import Upnext from '../parts/Upnext'
import { Box } from '@fxtrot/ui'

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
      <Box as="main" p="$4">
        <Upnext />
      </Box>
    </Layout>
  )
}

export default Home
