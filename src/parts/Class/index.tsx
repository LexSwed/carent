import React from 'react'
import { Box, Flex, Heading, StyleRecord, Text } from '@fxtrot/ui'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import ContentEditable from '../../editor/ContentEditable'
import Editor from '../../editor'

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
  },
  max: {
    height: '100%',
  },
}

const ClassPage = () => {
  const router = useRouter()
  const { loading, data } = useQuery(getClassInfo, {
    variables: {
      classId: router.query.classId?.[0],
    },
  })

  if (loading) {
    return <Box as="main" p="$4" />
  }

  return (
    <Box as="main" p="$4">
      <Flex space="$4" css={styles.fill}>
        <Flex flow="row" space="$4">
          <ContentEditable value={data.class.name} onInput={(val) => console.log(val)} as={Heading} />
          <Heading variant="light">{data.class.group.code}</Heading>
        </Flex>
        <Box pb="$8" css={styles.max}>
          <Flex space="$2" css={styles.fill}>
            <Flex flow="row">
              <Text tone="light" size="sm">
                Breadcrumbs and other items with sticky positioning
              </Text>
            </Flex>
            <Editor />
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default ClassPage

/**
 * content: [["some text", [["b"]]], ["link", [["a",  "href"], ["b"], ["c", "#aaaaff"]], ["some text"]]
 */
