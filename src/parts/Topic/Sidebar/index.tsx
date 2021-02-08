import React from 'react'
import { Heading, TextLink } from '@fxtrot/ui'

import { useClassTopics } from '../gql'
import { Card } from '../../../shared/Card'
import TopicList from '../../../shared/TopicList'
import { useClassId } from '../../../utils'

const Topics = () => {
  const { data } = useClassTopics()
  const classId = useClassId()

  return (
    <Card>
      <TopicList
        title={<Heading level={3}>All topics</Heading>}
        subtitle={
          <TextLink to={`/${classId}`} size="xs" tone="light" css={{ color: '$textLight', fontWeight: 'normal' }}>
            {data?.class?.name}
          </TextLink>
        }
      />
    </Card>
  )
}

export default Topics
