import React from 'react'
import { useSession } from 'next-auth/client'
import { Box, Flex, Spinner } from '@fxtrot/ui'
import { useRouter } from 'next/router'

import Layout from '../parts/Layout'
import Sidebar from '../parts/Sidebar'
import Upnext from '../parts/Upnext'
import TopicsList from '../parts/Topics'

const Home: React.FC = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  if (!session && !loading) {
    router.push('/auth/signin')

    return null
  }

  if (loading) {
    return (
      <Flex main="center" cross="center" css={{ width: '100vw', height: '100vh' }}>
        <Spinner size="md" />
      </Flex>
    )
  }

  return (
    <Layout>
      <Sidebar />
      <Box as="main" p="$4">
        <Flex space="$8">
          <Upnext />
          <TopicsList />
        </Flex>
      </Box>
    </Layout>
  )
}

export default Home
