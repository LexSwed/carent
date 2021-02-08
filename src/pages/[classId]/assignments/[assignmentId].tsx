import React from 'react'

import AssignmentBuilder from '../../../parts/Assignment'
import Sidebar from '../../../parts/Assignment/Sidebar'
import Layout from '../../../shared/Layout'

const AssignmentPage = () => {
  return (
    <Layout>
      <Sidebar />
      <AssignmentBuilder />
    </Layout>
  )
}

export default AssignmentPage
