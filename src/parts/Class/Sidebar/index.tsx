import React, { useEffect } from 'react'
import { Flex, MenuList, Text, StyleRecord, Heading } from '@fxtrot/ui'
import { gql, useQuery } from '@apollo/client'
import Image from 'next/image'
import Link from 'next/link'

import CreateNewClass from './CreateNewClass'
import { useRouter } from 'next/router'
import { useClassId } from '../../../utils'
import { Card } from '../../../shared/Card'

const getClassesQuery = gql`
  query getClasses {
    classes(first: 10) {
      edges {
        node {
          id
          name
          group {
            id
            code
          }
        }
      }
    }
  }
`

const styles: StyleRecord = {
  tile: {
    display: 'grid !important',
    gridTemplateColumns: '1fr auto',
    gap: '$2',
  },
}
const { Item } = MenuList

const Sidebar = () => {
  const { data, loading } = useQuery<GetClassesQuery>(getClassesQuery)
  const classId = useClassId()
  const { replace } = useRouter()

  useEffect(() => {
    const firstId = data?.classes?.edges?.[0]?.node?.id
    if (!classId && firstId) {
      replace(`/${firstId}`)
    }
  }, [data?.classes?.edges, classId, replace])

  if (loading) {
    return null
  }

  const noClasses = data.classes.edges.length === 0

  return (
    <Card>
      <Flex space="$4">
        {noClasses ? (
          <NoClasses />
        ) : (
          <Flex space="$4">
            <Heading level={3}>Classes</Heading>
            <MenuList as="nav">
              {data.classes.edges.map((item) => (
                <Link href={`/${item.node.id}`} key={item.node.id}>
                  <Item css={styles.tile} selected={item.node.id === classId} as="a">
                    <Text ellipsis>{item.node.name} </Text>
                    <Text tone="light" size="xs">
                      {item.node.group.code}
                    </Text>
                  </Item>
                </Link>
              ))}
            </MenuList>
          </Flex>
        )}
        <CreateNewClass defaultOpen={data.classes.edges.length === 0} />
      </Flex>
    </Card>
  )
}

export default Sidebar

function NoClasses() {
  return (
    <Flex space="$8" cross="center">
      <Image src="/draw/void.svg" alt="A human looking into space" width="auto" height={80} />
      <Text tone="light" size="sm">
        Create your first class to begin
      </Text>
    </Flex>
  )
}
