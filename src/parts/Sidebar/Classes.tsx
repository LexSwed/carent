import React, { useEffect } from 'react'
import { Box, Flex, MenuList, styled, Text } from '@fxtrot/ui'
import { gql, useQuery } from '@apollo/client'
import Image from 'next/image'
import Link from 'next/link'

import { Class, GetClassesQuery } from '../../graphql/generated'
import CreateNewClass from './CreateNewClass'
import { Card } from '../Card'
import { useRouter } from 'next/router'
import { useClassId } from '../../utils'

const getClassesQuery = gql`
  query getClasses {
    classes(first: 10) {
      totalCount
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

const ClassTile = styled(MenuList.Item, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$2',
  height: 'auto !important',
  p: '$3',
})

const Classes = () => {
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
    <Flex cross="spread" space="$2">
      {noClasses ? (
        <NoClasses />
      ) : (
        <MenuList as="nav">
          {data.classes.edges.map((item) => (
            <Link href={`/${item.node.id}`} key={item.node.id}>
              <ClassTile main="spread" selected={item.node.id === classId} as={'a' as $tempAny}>
                <Text ellipsis>{item.node.name} </Text>
                <Box textSize="$xs">
                  <Text tone="light" size="xs">
                    {item.node.group.code}
                  </Text>
                </Box>
              </ClassTile>
            </Link>
          ))}
        </MenuList>
      )}
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

// const Tile = styled(Card, {
//   all: 'unset',
//   border: '1px solid transparent',
//   transition: '0.14s ease-in',
//   p: '$2',
//   variants: {
//     selected: {
//       true: {
//         borderColor: '$primaryStill',
//       },
//     },
//   },
// })

// function ClassTile({ name, id, group, ...props }: Class & { selected: boolean }) {
//   return (
//     <Link href={`/${id}`}>
//       <Tile as="a" {...props}>
//         <Flex cross="spread">
//           <Text>{name}</Text>
//           <Text tone="light" size="xs">
//             {group.code}
//           </Text>
//         </Flex>
//       </Tile>
//     </Link>
//   )
// }
