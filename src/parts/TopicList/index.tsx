import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Icon } from '@fxtrot/ui'

import { NewTopic } from './NewTopic'
import { Topics } from './Topics'
import { TopicItem } from './TopicItem'
import { useClassTopics } from './gql'
import { AnimatePresence, motion } from 'framer-motion'
import { HiPlus } from 'react-icons/hi'

const TopicList: React.FC<Props> = ({ title, subtitle }) => {
  const [shown, setShown] = useState(false)
  const { data } = useClassTopics()

  const topics = data?.class.topics.edges || []

  useEffect(() => {
    setShown(topics.length < 3)
  }, [topics.length])

  return (
    <>
      <Box pb="$4">
        <Flex>
          <Flex flow="row" main="spread" cross="center">
            {title}
            <Button title="Create new topic" variant="flat" size="sm" onClick={() => setShown((shown) => !shown)}>
              <Icon as={HiPlus} />
            </Button>
          </Flex>
          {subtitle}
        </Flex>
      </Box>
      <AnimatePresence initial={false}>
        {shown && (
          <>
            <motion.div
              key="new-topic"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.24 }}
            >
              <NewTopic />
              <Box pb="$4" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Topics>
        {topics.map(({ node }, index) => (
          <TopicItem key={node.id} {...node} index={index} />
        ))}
      </Topics>
    </>
  )
}

export default TopicList

interface Props {
  title?: React.ReactNode
  subtitle?: React.ReactNode
}
