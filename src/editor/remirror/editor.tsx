import React, { FC, useCallback } from 'react'
import { styled } from '@fxtrot/ui'
import { BlockquoteExtension } from 'remirror/extension/blockquote'
import { BoldExtension } from 'remirror/extension/bold'
import { CalloutExtension } from 'remirror/extension/callout'
import { HeadingExtension } from 'remirror/extension/heading'
import { HistoryExtension } from 'remirror/extension/history'
import { ImageExtension } from 'remirror/extension/image'
import { ItalicExtension } from 'remirror/extension/italic'
import { LinkExtension } from 'remirror/extension/link'
import { ParagraphExtension } from 'remirror/extension/paragraph'
import { PlaceholderExtension } from 'remirror/extension/placeholder'
import { StrikeExtension } from 'remirror/extension/strike'
import { UnderlineExtension } from 'remirror/extension/underline'
import { ListPreset } from 'remirror/preset/wysiwyg'
import { RemirrorProvider, useManager, useRemirror } from 'remirror/react'

const EXTENSIONS = () => [
  new ImageExtension(),
  new BoldExtension({ weight: 600 }),
  new CalloutExtension(),
  new HistoryExtension({ depth: 50 }),
  new ItalicExtension(),
  new HeadingExtension({}),
  new LinkExtension({}),
  new ParagraphExtension(),
  new PlaceholderExtension(),
  new StrikeExtension(),
  new UnderlineExtension(),
  new BlockquoteExtension(),
  new ListPreset(),
]

const Sheet = styled('div', {
  minHeight: '60vh',
  cursor: 'text',
  px: '$8',
  pb: '$32',
})

const Editable = styled('div', {
  'cursor': 'text',
  '& > .remirror-editor': {
    outline: 'none',
  },
  '& .remirror-is-empty:first-child:before': {
    content: 'attr(data-placeholder)',
    color: '$textSubtle',
    pointerEvents: 'none',
    height: 0,
    float: 'left',
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
  // console.log(rest)
  // console.log(rest.getState())

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

  const handleChange = useCallback<React.ComponentProps<typeof RemirrorProvider>['onChange']>(({ tr, getJSON }) => {
    // console.log(getJSON())
  }, [])

  return (
    <RemirrorProvider placeholder="Start typing..." manager={extensionManager} onChange={handleChange}>
      <SmallEditor />
    </RemirrorProvider>
  )
}

export default Editor
