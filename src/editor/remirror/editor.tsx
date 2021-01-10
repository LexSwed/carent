import React, { FC, useCallback } from 'react'
import { styled } from '@fxtrot/ui'

import { HeadingExtension } from 'remirror/extension/heading'
import { LinkExtension } from 'remirror/extension/link'
import { ParagraphExtension } from 'remirror/extension/paragraph'
import { PlaceholderExtension } from 'remirror/extension/placeholder'
import { ImageExtension } from 'remirror/extension/image'
import { BulletListExtension, ListItemExtension, OrderedListExtension } from 'remirror/preset/list'
import { BlockquoteExtension } from 'remirror/extension/blockquote'
import { RemirrorProvider, useManager, useRemirror } from 'remirror/react'
import { usePositioner, useEditorFocus } from 'remirror/react/hooks'

const EXTENSIONS = () => [
  new HeadingExtension({}),
  new LinkExtension({ autoLink: false }),
  new BlockquoteExtension(),
  new BulletListExtension(),
  new ListItemExtension(),
  new OrderedListExtension(),
  new ParagraphExtension(),
  new PlaceholderExtension(),
  new ImageExtension(),
]

const Sheet = styled('div', {
  width: 900,
  minHeight: '60vh',
  cursor: 'text',
  px: '$20',
  pb: '$32',
})

const Editable = styled('div', {
  'cursor': 'text',
  '& > .remirror-editor': {
    outline: 'none',
  },
  '& a': {
    color: '$textLight',
  },
  '& *': {
    'boxSizing': 'border-box',
    'wordWrap': 'break-word',
    'whiteSpace': 'pre-wrap',
    'textDecorationColor': '$borderLight',
    'p': 0,
    'm': 0,
    'caret-color': '$textLight',
  },
})

const SmallEditor: FC = () => {
  const { getRootProps, focus, ...rest } = useRemirror({ autoUpdate: true })
  console.log(rest)
  console.log(rest.getState())

  const handleFocus = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.currentTarget.contains(document.activeElement)) {
        return null
      }
      focus()
    },
    [focus]
  )

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
