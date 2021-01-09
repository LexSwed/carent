import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useAllHandlers } from '@fxtrot/ui'
import ContentEditable from './ContentEditable'
import type { Block } from './types'
import { parseTreeToContent, parseBlock, createWalker } from './utils'

interface Props {
  block: Block
  onChange: (newBlock: Block) => void
  onKeyDown: React.ComponentProps<typeof ContentEditable>['onKeyDown']
}

const BlockEditor = React.memo<Props>(({ block, onChange, ...props }) => {
  const [html, setHTML] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const walker = useRef<TreeWalker | null>(null)

  const refs = useCallback((node: HTMLDivElement) => {
    ref.current = node
    walker.current = createWalker(node)
  }, [])

  const handleInput = useAllHandlers((html: string) => {
    const nodeWalker = walker.current
    const newContent: Block['content'] = parseTreeToContent(nodeWalker, block.content)
    onChange({ ...block, content: newContent })
  })

  useEffect(() => {
    const newHtml = parseBlock(block)
    console.log(newHtml)
    setHTML(newHtml)
  }, [block])

  return <ContentEditable data-id={block.id} html={html} as={block.type} ref={refs} onInput={handleInput} {...props} />
})

BlockEditor.displayName = 'BlockEditor'

export default BlockEditor
