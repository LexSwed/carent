import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useKeyboardHandles } from '@fxtrot/ui'
import BlockEditor from './BlockEditor'
import type { Block } from './types'

const blocks: Block[] = [
  {
    id: 'some-id',
    layout: 'full',
    type: 'p',
    content: [
      ['Text ', []],
      ['in between of ', []],
      ['text ', [['a', 'href'], ['b']]],
      [
        'text ',
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

const Editor: React.FC = () => {
  const handleKeyDown = useKeyboardHandles({
    Enter: (e) => {},
  })

  return (
    <>
      {blocks.map((block) => (
        <BlockEditor
          block={block}
          onChange={(newBlock) => {
            console.log(newBlock)
          }}
          onKeyDown={handleKeyDown}
        />
      ))}
    </>
  )
}

export default Editor
