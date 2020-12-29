import React, { useCallback } from 'react'
import type { StitchesProps } from '@stitches/react'
// import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { styled, css, useKeyboardHandles } from '@fxtrot/ui'
import DOMPurify from 'dompurify'

const EditableBlock = styled('div', {
  'outline': 'none',
  'cursor': 'text',
  '&[placeholder]:empty:before': {
    content: 'attr(placeholder)',
    color: '$gray300',
  },
})

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

interface ContentEditableProps extends Omit<React.ComponentProps<'div'>, 'onInput'> {
  css: StitchesProps<typeof EditableBlock>['css']
  value: string
  onInput?: (html: string, event: React.KeyboardEvent<HTMLDivElement>) => void
  placeholder?: string
}

function ContentEditable({ css, placeholder, value, onInput, ...props }: ContentEditableProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = DOMPurify.sanitize(value, { USE_PROFILES: { html: true } })
    if (document.activeElement === ref.current) {
      replaceCaret(ref)
    }
  }, [value])

  const handleInput = useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      onInput?.(event.currentTarget.innerHTML, event)
    },
    [onInput]
  )

  return (
    <EditableBlock
      contentEditable
      spellCheck={false}
      css={css}
      placeholder={placeholder}
      ref={ref as $tempAny}
      onInput={handleInput}
      {...props}
    />
  )
}

function replaceCaret(elementRef: React.RefObject<HTMLElement>) {
  const target = document.createTextNode('')
  const el = elementRef.current
  el.appendChild(target)
  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === el
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    const sel = window.getSelection()
    if (sel !== null) {
      const range = document.createRange()
      range.setStart(target, target.nodeValue.length)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
    if (el instanceof HTMLElement) el.focus()
  }
}
