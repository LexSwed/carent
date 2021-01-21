import { styled, Box } from '@fxtrot/ui'
import React from 'react'

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '320px 1fr',
  gap: '$4',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  transition: '0.2s easy-in-out',
  p: '$4',
})

const Main = styled('main', {
  maxWidth: 960,
})

const Layout = ({ children }) => {
  return (
    <Grid>
      <Box height="100%">{children[0]}</Box>
      <Main>{children[1]}</Main>
    </Grid>
  )
}

export default Layout
