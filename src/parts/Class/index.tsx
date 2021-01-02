import React from 'react'
import { Box, Flex, StyleRecord } from '@fxtrot/ui'
import { gql, useQuery } from '@apollo/client'

import Topics from './Topics'
import { useClassId } from '../../utils'
import ClassHeader from './Header'

const getClassInfo = gql`
  query getClassInfo($classId: String!) {
    class(id: $classId) {
      id
      name
      group {
        id
        code
      }
    }
  }
`

const styles: StyleRecord = {
  fill: {
    height: '-webkit-fill-available',
    overflow: 'hidden',
  },
  max: {
    maxHeight: '100%',
    overflow: 'hidden',
  },
  main: {
    p: '$4',
    bc: 'rgba(255,255,255,0.9)',
    shadow: '-5px 10px 25px -5px rgba(0, 0, 0, 0.03), -5px 5px 10px -5px rgba(0, 0, 0, 0.01)',
    maxHeight: '100%',
    overflow: 'hidden',
  },
}

const ClassPage = () => {
  const classId = useClassId()
  const { loading, data } = useQuery(getClassInfo, {
    variables: {
      classId,
    },
  })

  if (loading || !data) {
    return <Box as="main" p="$4" css={styles.main} />
  }

  return (
    <Box as="main" css={styles.main}>
      <Flex space="$4" css={styles.max}>
        <ClassHeader name={data.class.name} code={data.class.group.code} />
        <Box py="$2">Tabs</Box>
        <Box display="grid" gridTemplate="100% / 300px 1fr" css={styles.fill}>
          <Topics />
        </Box>
      </Flex>
    </Box>
  )
}

export default ClassPage
