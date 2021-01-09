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

const SmallEditor: FC = () => {
  const { getRootProps, ...rest } = useRemirror({ autoUpdate: true })
  console.log(rest)
  console.log(rest.getState())
  console.log(getRootProps())
  return (
    <div>
      <div {...getRootProps()} />
    </div>
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
