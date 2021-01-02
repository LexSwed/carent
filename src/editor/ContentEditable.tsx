import React, { useCallback } from 'react'
import type { StitchesProps } from '@stitches/react'
import { styled } from '@fxtrot/ui'
import DOMPurify from 'dompurify'

const EditableBlock = styled('div', {
  'outline': 'none',
  'cursor': 'text',
  '&[placeholder]:empty:before': {
    content: 'attr(placeholder)',
    color: '$gray300',
  },
})

interface ContentEditableProps extends Omit<React.ComponentProps<'div'>, 'onInput' | 'defaultValue'> {
  as?: React.ElementType
  css?: StitchesProps<typeof EditableBlock>['css']
  value?: string
  onInput?: (html: string, event: React.KeyboardEvent<HTMLDivElement>) => void
  placeholder?: string
  defaultValue?: string
}

function ContentEditable({ value, defaultValue, onInput, ...props }: ContentEditableProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  const updateHtml = React.useCallback((value: string) => {
    if (!ref.current) return
    ref.current.innerHTML = DOMPurify.sanitize(value, { USE_PROFILES: { html: true } })
    if (document.activeElement === ref.current) {
      replaceCaret(ref)
    }
  }, [])

  React.useEffect(() => {
    updateHtml(defaultValue)
  }, [defaultValue, updateHtml])

  React.useLayoutEffect(() => {
    updateHtml(value)
  }, [value, updateHtml])

  const handleInput = useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      onInput?.(event.currentTarget.innerHTML.replace?.(/&nbsp;|\u202F|\u00A0/g, ' '), event)
    },
    [onInput]
  )

  return <EditableBlock contentEditable spellCheck={false} ref={ref as $tempAny} onInput={handleInput} {...props} />
}

export default ContentEditable

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
