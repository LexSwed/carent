import React from 'react'
import { Flex, styled } from '@fxtrot/ui'

const Wrapper = styled(Flex, {
  width: '100%',
  height: '$32',
  bc: '$coolGray50',
  br: '$lg',
})

const Upnext = () => {
  return (
    <Wrapper main="center" cross="center">
      Calendar of upcoming events
    </Wrapper>
  )
}

export default Upnext
