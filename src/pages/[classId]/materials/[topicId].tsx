import { Box } from '@fxtrot/ui'
import React from 'react'
import Topics from '../../../parts/Materials/Sidebar'
import Layout from '../../../parts/Layout'
import Topic from '../../../parts/Materials/Topic'

const TopicsPage = () => {
  return (
    <Layout>
      <Topics />
      <Box>
        <Topic />
      </Box>
    </Layout>
  )
}

export default TopicsPage
