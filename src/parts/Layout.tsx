import { styled, Box } from '@fxtrot/ui'
import React from 'react'

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
      <Box height="100%">{children[0]}</Box>
      <Main>{children[1]}</Main>
    </Grid>
  )
}

export default Layout
