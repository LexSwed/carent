import { styled } from '@fxtrot/ui'
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

const Layout = ({ children }) => {
  return <Grid>{children}</Grid>
}

export default Layout
