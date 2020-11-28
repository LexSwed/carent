import React from 'react'
import { Button, Flex, Icon, styled, ThemeProvider } from '@fxtrot/ui'
import { gql, useQuery } from '@apollo/client'

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
  const { data } = useQuery(getClassesQuery)
  return <Flex cross="spread"></Flex>
}

export default Classes
