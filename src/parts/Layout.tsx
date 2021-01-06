import { styled, Box } from '@fxtrot/ui'
import React from 'react'

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '300px 1fr',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  bc: 'rgba(255,255,255,0.9)',
  transition: '0.2s easy-in-out',
})

const Main = styled('main', {
  p: '$4',
  pb: 0,
  bc: 'rgba(255,255,255,0.9)',
  shadow: '-5px 10px 25px -5px rgba(0, 0, 0, 0.03), -5px 5px 10px -5px rgba(0, 0, 0, 0.01)',
})

const Layout = ({ children }) => {
  return (
    <Grid>
      <Box height="100%" py="$4">
        {children[0]}
      </Box>
      <Main>
        <Box maxWidth={960}>{children[1]}</Box>
      </Main>
    </Grid>
  )
}

export default Layout
