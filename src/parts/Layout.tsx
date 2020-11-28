import { Box, styled } from '@fxtrot/ui'
import React from 'react'

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '300px 1fr',
  height: '100vh',
  width: '100vw',
})

const Layout = ({ children }) => {
  return <Grid>{children}</Grid>
}

export default Layout
