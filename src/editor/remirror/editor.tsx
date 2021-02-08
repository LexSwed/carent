import React from 'react'
import { styled } from '@fxtrot/ui'
import {
  ImageExtension,
  HistoryExtension,
  LinkExtension,
  ParagraphExtension,
  BoldExtension,
  PlaceholderExtension,
  UnderlineExtension,
} from 'remirror/extensions'
import { ThemeProvider, ToolbarItemUnion, ComponentItem, Remirror, Toolbar, useRemirror } from '@remirror/react'

const extensions = () => [
  new ImageExtension(),
  new BoldExtension({ weight: 600 }),
  new HistoryExtension({ depth: 50 }),
  new LinkExtension({}),
  new ParagraphExtension(),
  new PlaceholderExtension(),
  new UnderlineExtension(),
]

const Sheet = styled('div', {
  minHeight: '60vh',
  cursor: 'text',
  px: '$8',
  pb: '$32',
})

const Editable = styled('pre', {
  'cursor': 'text',
  '& > .remirror-editor': {
    'outline': 'none',
    'caret-color': '$textLight',
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
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    textDecorationColor: '$borderLight',
  },
  '& p': {
    px: 0,
    py: '$1',
    m: 0,
  },
  '& ul, & ol': {
    py: '$1',
    pl: '$6',
    m: 0,
  },
  '& ol': {
    '& > li': {
      '&::marker': {
        color: '$textSubtle',
      },
    },
  },
  '& ul': {
    '> li': {
      '&::marker': {
        color: '$textSubtle',
      },
    },
  },
  '& blockquote': {
    m: 0,
    pl: '$4',
    py: '$2',
    color: '$textLight',
    borderLeft: '2px solid $borderHover',
  },
})

const Editor = () => {
  const { manager, state, onChange, getContext } = useRemirror({
    extensions,
    stringHandler: 'markdown',
  })

  return (
    <ThemeProvider>
      <Sheet>
        <Remirror manager={manager} autoFocus onChange={onChange} state={state} autoRender="end">
          <Toolbar items={toolbarItems} refocusEditor label="Top Toolbar" />
        </Remirror>
        <Editable>
          <code>{getContext()?.helpers.getMarkdown(state)}</code>
        </Editable>
      </Sheet>
    </ThemeProvider>
  )
}

export default Editor

const toolbarItems: ToolbarItemUnion[] = [
  {
    type: ComponentItem.ToolbarGroup,
    label: 'Simple Formatting',
    items: [
      { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleBold', display: 'icon' },
      { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleItalic', display: 'icon' },
      { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleStrike', display: 'icon' },
      { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleCode', display: 'icon' },
    ],
    separator: 'end',
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: 'Simple Formatting',
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleBlockquote',
        display: 'icon',
      },
      { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleCodeBlock', display: 'icon' },
    ],
    separator: 'end',
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: 'History',
    items: [
      { type: ComponentItem.ToolbarCommandButton, commandName: 'undo', display: 'icon' },
      { type: ComponentItem.ToolbarCommandButton, commandName: 'redo', display: 'icon' },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleColumns',
        display: 'icon',
        attrs: { count: 2 },
      },
    ],
    separator: 'none',
  },
]
