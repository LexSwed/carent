import React from 'react'
import { css, useKeyboardHandles } from '@fxtrot/ui'

import ContentEditable from './ContentEditable'

const blockStyle = {
  h1: css({
    fontSize: '$2xl',
  }),
  h2: css({
    fontSize: '$xl',
  }),
  h3: css({
    fontSize: '$lg',
  }),
  h4: css({
    fontSize: '$lg',
  }),
  p: css({}),
}

const Editor = () => {
  const [text, setText] = React.useState('')
  const [blockType, setBlockType] = React.useState<keyof typeof blockStyle>('p')

  const handleInput = (html: string) => {
    switch (html) {
      case '#&nbsp;': {
        setText('')
        return setBlockType('h1')
      }
      case '##&nbsp;': {
        setText('')
        return setBlockType('h2')
      }
      case '###&nbsp;': {
        setText('')
        return setBlockType('h3')
      }
      case '####&nbsp;': {
        setText('')
        return setBlockType('h4')
      }
      default:
        setText(html)
    }
  }

  const handleKeyDown = useKeyboardHandles({
    'Backspace.propagate': (ev) => {
      if (ev.currentTarget.innerHTML === '') {
        setBlockType('p')
      }
    },
    'Enter': () => {
      // create new block
    },
  })

  return (
    <ContentEditable
      css={blockStyle[blockType]}
      value={text}
      placeholder="Title of the topic"
      onInput={handleInput}
      onKeyDown={handleKeyDown}
    />
  )
}

export default Editor
