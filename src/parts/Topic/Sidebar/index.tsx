import React from 'react'
import { Heading, TextLink } from '@fxtrot/ui'

import { useClassTopics } from '../gql'
import { Card } from '../../../shared/Card'
import TopicList from '../../../shared/TopicList'
import { useClassId } from '../../../utils'
import Link from 'next/link'

const Topics = () => {
  const { data } = useClassTopics()
  const classId = useClassId()

  return (
    <Card>
      <TopicList
        title={<Heading level={3}>All topics</Heading>}
        subtitle={
          <Link href={`/${classId}`}>
            <TextLink size="xs" tone="light" css={{ color: '$textLight', fontWeight: 'normal' }}>
              {data?.class?.name}
            </TextLink>
          </Link>
        }
      />
    </Card>
  )
}

export default Topics
