import React, { FC } from 'react'

import { HeadingExtension } from 'remirror/extension/heading'
import { LinkExtension } from 'remirror/extension/link'
import { ParagraphExtension } from 'remirror/extension/paragraph'
import { PlaceholderExtension } from 'remirror/extension/placeholder'
import { ImageExtension } from 'remirror/extension/image'
import { BulletListExtension, ListItemExtension, OrderedListExtension } from 'remirror/preset/list'
import { BlockquoteExtension } from 'remirror/extension/blockquote'
import { RemirrorProvider, useManager, useRemirror } from 'remirror/react'
import { usePositioner, useEditorFocus } from 'remirror/react/hooks'
import { CorePreset } from 'remirror/preset/core'
import { styled } from '@fxtrot/ui'

const EXTENSIONS = () => [
  new HeadingExtension({}),
  new LinkExtension({}),
  new BlockquoteExtension(),
  new BulletListExtension(),
  new ListItemExtension(),
  new OrderedListExtension(),
  new ParagraphExtension(),
  new PlaceholderExtension(),
  new ImageExtension(),
  new CorePreset({}),
]

const Sheet = styled('div', {
  width: 900,
  minHeight: '60vh',
  cursor: 'text',
  px: '$20',
  pb: '$32',
})

const Editable = styled('div', {
  'outline': 'none',
  'cursor': 'text',
  'p': 0,
  'm': 0,
  'caret-color': '$textLight',
  '&[placeholder]:empty:before': {
    content: 'attr(placeholder)',
    color: '$textSubtle',
  },
  '& > a': {
    color: '$textLight',
  },
  '& > *': {
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    textDecorationColor: '$borderLight',
  },
  '& > [data-style*="b"]': {
    fontWeight: 600,
  },
  '& > [data-style*="u"]': {
    textDecorationLine: 'underline',
  },
  '& > [data-style*="s"]': {
    textDecorationLine: 'line-through',
  },
  '& > [data-style*="u"][data-style*="s"]': {
    textDecorationLine: 'underline line-through',
  },
  '& > [data-style*="i"]': {
    fontStyle: 'italic',
  },
})

const SmallEditor: FC = () => {
  const { getRootProps, focus, ...rest } = useRemirror({ autoUpdate: true })
  console.log(rest)
  console.log(rest.getState())

  function handleFocus(e) {
    if (e.currentTarget.contains(document.activeElement)) {
      return null
    }
    focus()
  }
  return (
    <Sheet onClick={handleFocus}>
      <Editable {...getRootProps()} />
    </Sheet>
  )
}

const Editor = () => {
  const extensionManager = useManager(EXTENSIONS)

  function handleChange(...args) {
    console.log(...args)
  }

  return (
    <RemirrorProvider manager={extensionManager} onChange={handleChange}>
      <SmallEditor />
    </RemirrorProvider>
  )
}

export default Editor
