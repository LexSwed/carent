import React, { FC } from 'react'
import { HeadingExtension } from 'remirror/extension/heading'
import { HistoryExtension } from 'remirror/extension/history'
import { LinkExtension } from 'remirror/extension/link'
import { ParagraphExtension } from 'remirror/extension/paragraph'
import { PlaceholderExtension } from 'remirror/extension/placeholder'
import { ImageExtension } from 'remirror/extension/image'
import { ListItemExtension } from 'remirror/preset/list'
import { RemirrorProvider, useManager, useRemirror } from 'remirror/react'
import { CorePreset } from 'remirror/preset/core'

const EXTENSIONS = () => [
  new HistoryExtension({}),
  new HeadingExtension({}),
  new LinkExtension({}),
  new ListItemExtension(),
  new ParagraphExtension(),
  new PlaceholderExtension(),
  new ImageExtension(),
  new CorePreset({}),
]

const SmallEditor: FC = () => {
  const { getRootProps, ...rest } = useRemirror()
  console.log(rest)
  console.log(getRootProps())
  return (
    <div>
      <div {...getRootProps()} />
    </div>
  )
}

const SmallEditorContainer = () => {
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

export default SmallEditorContainer
