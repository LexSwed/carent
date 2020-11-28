import React from 'react'
import { Box, Flex, Text } from '@fxtrot/ui'
import { gql, useQuery } from '@apollo/client'
import Image from 'next/image'

import { GetClassesQuery } from '../../graphql/generated'
import CreateNewClass from './CreateNewClass'
import { Card } from '../Card'

const getClassesQuery = gql`
  query getClasses {
    classes(first: 10) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

const Classes = () => {
  const { data, loading } = useQuery<GetClassesQuery>(getClassesQuery)

  if (loading) {
    return null
  }

  const noClasses = data.classes.edges.length === 0

  return (
    <Flex cross="spread" space="$2">
      {noClasses ? <NoClasses /> : data.classes.edges.map((item) => <Box key={item.node.id}>{item.node.name}</Box>)}
      <CreateNewClass defaultOpen={data.classes.edges.length === 0} />
    </Flex>
  )
}

export default Classes

function NoClasses() {
  return (
    <Card>
      <Flex space="$8" cross="center">
        <Image src="/void.svg" alt="A human looking into space" width="auto" height={80} />
        <Text tone="light" size="sm">
          Create your first class to begin
        </Text>
      </Flex>
    </Card>
  )
}
