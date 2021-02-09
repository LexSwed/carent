import { styled, Box, Flex } from '@fxtrot/ui'
import React from 'react'

import UserPanel from './UserPanel'

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '320px [sidebar] 1fr [main]',
  gap: '$4',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  transition: '0.2s easy-in-out',
  p: '$4',
  maxWidth: 1600,
  mx: 'auto',
})

const Main = styled('main', {})

const Layout = ({ children }) => {
  return (
    <Grid>
      <Box space="$4" as={Flex} minHeight="100%">
        {children[0]}
        <UserPanel css={{ mt: 'auto' }} />
      </Box>
      <Main>{children[1]}</Main>
    </Grid>
  )
}

export default Layout
