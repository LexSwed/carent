import { styled, Flex } from '@fxtrot/ui'
import React from 'react'

import UserPanel from './UserPanel'

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '320px [sidebar] 1fr [main]',
  gap: '$4',
  minHeight: '100vh',
  height: '100%',
  width: '100%',
  transition: '0.2s easy-in-out',
  maxWidth: 1600,
  mx: 'auto',
})

const Main = styled('main', {
  p: '$4',
})

const Layout = ({ children }) => {
  return (
    <Grid>
      <Flex gap="4" css={{ minHeight: '100%', p: '$4' }}>
        {children[0]}
        <UserPanel css={{ mt: 'auto' }} />
      </Flex>
      <Main>{children[1]}</Main>
    </Grid>
  )
}

export default Layout
