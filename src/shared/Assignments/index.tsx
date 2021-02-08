import React from 'react'
import { useClassId, useTopicId } from '../../utils'
import { useClassAssignments } from './gql'

import AssignmentsList from './List'
import NoAssignments from './Empty'

interface Props {
  topicId?: string
}
const Assignments: React.FC<Props> = ({ topicId: propsTopicId }) => {
  const classId = useClassId()
  let topicId = useTopicId()
  topicId = propsTopicId ?? topicId

  const { data: { assignments } = {}, loading } = useClassAssignments(classId, topicId)

  if (loading) {
    return null
  }

  if (assignments?.edges.length > 0) {
    return <AssignmentsList topicId={topicId} edges={assignments?.edges} />
  }

  return <NoAssignments topicId={topicId} />
}

export default Assignments
