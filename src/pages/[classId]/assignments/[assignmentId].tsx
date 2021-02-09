import React from 'react'

import Assignment from '../../../parts/Assignment'
import Sidebar from '../../../parts/Assignment/Sidebar'
import Layout from '../../../shared/Layout'

const AssignmentPage = () => {
  return (
    <Layout>
      <Sidebar />
      <Assignment />
    </Layout>
  )
}

export default AssignmentPage
