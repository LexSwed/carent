import React from 'react'
import Layout from '../../../shared/Layout'
import { useAssignmentId } from '../../../utils'

const AssignmentPage = () => {
  const id = useAssignmentId()

  return (
    <Layout>
      <div>Drag'n'Drop items</div>
      <div>builder</div>
    </Layout>
  )
}

export default AssignmentPage
