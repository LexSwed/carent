import React from 'react'
import { Button, Flex, TextField, Icon, StyleRecord } from '@fxtrot/ui'
import { HiChevronLeft } from 'react-icons/hi'
import Link from 'next/link'

import { useOnBlurUpdateTopicTitle, useTopicDetails } from '../gql'
import { useClassId } from '../../../utils'

import TopicHeaderMenu from './TopicHeaderMenu'

const Header: React.FC = () => {
  const classId = useClassId()
  const { data } = useTopicDetails()
  const handleBlur = useOnBlurUpdateTopicTitle()

  return (
    <Flex flow="row" main="spread" cross="center">
      <Flex flow="row" cross="center" main="stretch" css={{ flex: 2 }} space="$4">
        <Link href={`/${classId}`}>
          <Button variant="flat" as="a">
            <Icon as={HiChevronLeft} size="xl" />
          </Button>
        </Link>
        {data && <TextField defaultValue={data.topic.title} onBlur={handleBlur} variant="inline" css={style.title} />}
      </Flex>
      <TopicHeaderMenu />
    </Flex>
  )
}

const style: StyleRecord = {
  title: {
    '& input': {
      fontSize: '$2xl',
      fontWeight: 600,
      p: 0,
    },
  },
}

export default Header
