import React from 'react'
import { useSession } from 'next-auth/client'
import { Flex, Spinner } from '@fxtrot/ui'
import { useRouter } from 'next/router'

import Layout from '../parts/Layout'
import Sidebar from '../parts/Class/Sidebar'
import ClassPage from '../parts/Class'

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
      <ClassPage />
    </Layout>
  )
}

export default Home
