import React from 'react'
import { Flex, styled, useKeyboardHandles } from '@fxtrot/ui'
import produce from 'immer'

import BlockEditor from './BlockEditor'
import type { Block } from './types'
import { getTextNodeToken } from './utils'

const initBlock: Block[] = [
  {
    id: 'some-id',
    layout: 'full',
    type: 'p',
    content: [
      ['Text '],
      ['in between of ', []],
      ['text', [['a', 'href'], ['b']]],
      [
        ' text ',
        [
          ['a', 'href'],
          ['b', 'u'],
        ],
      ],
      ['other text ', [['b', 's', 'u']]],
      ['and another text', [['s', 'b', 'u']]],
    ],
  },
]

const Sheet = styled('div', {
  width: 900,
  minHeight: '60vh',
  cursor: 'text',
  px: '$20',
  pb: '$32',
})

const Editor: React.FC = () => {
  const [blocks, setBlocks] = React.useState<Block[]>(initBlock)
  const handleKeyDown = useKeyboardHandles({
    Enter: (e) => {
      const { focusNode, focusOffset, isCollapsed } = window.getSelection()
      if (!isCollapsed) return
      const [id, textIndex] = getTextNodeToken(focusNode.parentElement)
      const blockIndex = blocks.findIndex((block) => block.id === id)
      const block = blocks[blockIndex]

      // the end of the block
      if (
        focusNode.parentElement === e.currentTarget.lastChild &&
        focusOffset === focusNode.parentElement.textContent.length
      ) {
        setBlocks((blocks) =>
          produce(blocks, (draft) => {
            draft.splice(blockIndex + 1, 0, createNewBlock())
          })
        )
        return
      }

      const oldBlockText = blocks[blockIndex].content[textIndex][0].slice(0, focusOffset)
      const newBlockText = blocks[blockIndex].content[textIndex][0].slice(focusOffset)

      const oldBlock = produce(block, (draft) => {
        draft.content = block.content.slice(0, textIndex + 1)
        draft.content[textIndex][0] = oldBlockText
      })

      const newBlock = produce(block, (draft) => {
        draft.id = `${Date.now()}`
        draft.layout = 'full'
        draft.content = block.content.slice(textIndex + 1)

        draft.content[0][0] = newBlockText
      })
      const newBlocks = produce(blocks, (draft) => {
        draft.splice(blockIndex, 1, oldBlock, newBlock)
      })

      setBlocks(newBlocks)
    },
  })

  return (
    <Sheet onClick={focusEditor}>
      <Flex space="$2">
        {blocks.map((block, index) => (
          <BlockEditor
            key={block.id}
            block={block}
            onChange={(newBlock) => {
              setBlocks((blocks) =>
                produce(blocks, (draft) => {
                  draft.splice(index, 1, newBlock)
                })
              )
            }}
            onKeyDown={handleKeyDown}
          />
        ))}
      </Flex>
    </Sheet>
  )
}

export default Editor

function focusEditor(e: React.MouseEvent<HTMLDivElement>) {
  if (e.currentTarget.contains(document.activeElement)) return
  e.currentTarget.querySelector<HTMLElement>('[contenteditable="true"]')?.focus()
}

function createNewBlock(): Block {
  return {
    id: `${Date.now()}`,
    layout: 'full',
    type: 'p',
    content: [['']],
  }
}
