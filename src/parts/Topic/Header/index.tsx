import React from 'react'
import { Button, Flex, TextField, Icon, StyleRecord } from '@fxtrot/ui'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import Link from 'next/link'

import { useOnBlurUpdateTopicTitle, useTopicDetails } from '../gql'
import { useClassId } from '../../../utils'

import TopicHeaderMenu from './TopicHeaderMenu'

const Header: React.FC = () => {
  const classId = useClassId()
  const { data } = useTopicDetails()
  const handleBlur = useOnBlurUpdateTopicTitle()

  return (
    <Flex flow="row" main="space-between" cross="center" gap="4">
      <Flex flow="row" cross="center" main="stretch" css={{ flex: 2 }} gap="4">
        <Link href={`/${classId}`}>
          <Button variant="flat" as="a">
            <Icon as={ChevronLeftIcon} size="lg" />
          </Button>
        </Link>
        {data && (
          <TextField defaultValue={data.topic.title} onBlur={handleBlur} variant="transparent" css={style.title} />
        )}
      </Flex>
      <TopicHeaderMenu />
    </Flex>
  )
}

const style: StyleRecord = {
  title: {
    '& input': {
      fontSize: '$xl',
      fontWeight: 600,
    },
  },
}

export default Header
