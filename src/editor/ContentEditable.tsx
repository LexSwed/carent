import React, { useRef, useCallback, useMemo, useEffect } from 'react'
import type { StitchesProps } from '@stitches/react'
import { styled, useForkRef, useLatest } from '@fxtrot/ui'
import DOMPurify from 'dompurify'
import debounce from 'debounce'

const Editable = styled('div', {
  'outline': 'none',
  'cursor': 'text',
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

interface ContentEditableProps {
  as?: React.ElementType
  css?: StitchesProps<typeof Editable>['css']
  placeholder?: string
  html: string
  onInput?: (html: string) => void
  onBlur?: (html: string) => void
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>
}

const ContentEditable = React.forwardRef<HTMLDivElement, ContentEditableProps>(
  ({ html, onInput, onBlur, ...props }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null)

    const latestOnInput = useLatest(onInput)

    const refs = useForkRef(innerRef, ref)

    const debouncedInput = useMemo(
      () =>
        debounce((innerHTML: string) => {
          if (!latestOnInput.current) return
          const html = normalize(innerHTML)
          latestOnInput.current(html)
        }, 800),
      [latestOnInput]
    )

    useEffect(() => {
      if (normalize(innerRef.current.innerHTML) !== html) {
        updateInnerHtml(html, innerRef)
        debouncedInput.clear()
      }
    }, [html, debouncedInput])

    const handleInput = useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
      (event) => debouncedInput(event.currentTarget.innerHTML),
      [debouncedInput]
    )
    const handleBlur = useCallback<React.FocusEventHandler<HTMLDivElement>>(
      (event) => {
        debouncedInput.flush()
        onBlur?.(normalize(event.currentTarget.innerHTML))
      },
      [debouncedInput, onBlur]
    )

    return (
      <Editable contentEditable spellCheck={false} ref={refs} onInput={handleInput} onBlur={handleBlur} {...props} />
    )
  }
)

ContentEditable.displayName = 'ContentEditable'

export default ContentEditable

function replaceCaret(elementRef: React.RefObject<HTMLElement>) {
  const el = elementRef.current
  const target = document.createTextNode('')
  el.appendChild(target)
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

function normalize(html: string) {
  return html.replace?.(/&nbsp;|\u202F|\u00A0/g, ' ')
}

function updateInnerHtml(newHtml: string, ref: React.RefObject<HTMLElement>) {
  if (!ref) return
  ref.current.innerHTML = DOMPurify.sanitize(newHtml, { USE_PROFILES: { html: true } })
  if (document.activeElement === ref.current) {
    replaceCaret(ref)
  }
}
