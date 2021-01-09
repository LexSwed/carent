import type {
  Block,
  BlockAttributes,
  BlockAttributesWithTag,
  BlockStylesAttribute,
  BlockStyleTags,
  BlockTagTypes,
} from './types'

export function parseBlock(block: Block): string {
  return block.content.reduce((res, [text, attrs], index) => {
    if (!attrs || attrs.length === 0) {
      res += text
      return res
    }
    let tag = 'span'
    let tagAttrs = ''
    let styles: BlockStylesAttribute

    if (isSpecialTag(attrs)) {
      tagAttrs = tagAttribute[attrs[0][0]](...attrs[0])
      styles = attrs[1]
      tag = attrs[0][0]
    } else {
      styles = attrs[0]
    }

    const style = getStyle(styles)

    res += `<${tag} ${tagAttrs} data-token="${block.id}:-:${index}" ${style}>${text}</${tag}>`

    return res
  }, '')
}

export function parseTreeToContent(walker: TreeWalker, currentContent: Block['content']): Block['content'] {
  // the node is empty
  if ('' === walker.root.textContent) {
    return [['']]
  }

  const newContent: Block['content'] = []
  let currentNode = walker.nextNode()
  while (currentNode) {
    const prevBlock = newContent[newContent.length - 1]
    const textBlock = currentNode.parentElement
    // add text node to the previous block
    if (textBlock === walker.root) {
      if (prevBlock) {
        prevBlock[0] += currentNode.textContent
      } else {
        newContent.push([currentNode.textContent, []])
      }
    } else {
      const attrs: BlockAttributes = currentContent[getTextNodeToken(textBlock as HTMLElement)?.[1]]?.[1] || []
    
      if (prevBlock && deepEqual(attrs, prevBlock[1])) {
        prevBlock[0] += currentNode.textContent
      } else {
        newContent.push([currentNode.textContent, attrs])
      }
    }

    currentNode = walker.nextNode()
  }
  walker.currentNode = walker.root
console.log(newContent)
  // block was cleared up so the only parent was root itself
  if (newContent.length === 0) {
    newContent.push([walker.currentNode.textContent, []])
  }

  console.log(newContent)

  return newContent
}

export function getTextNodeToken(node: HTMLElement): [id: string, index: number] {
  const [id, index] = node.dataset.token.split(':-:')

  return [id, parseInt(index, 10)]
}


function deepEqual(left: any[], right: any[]) {
  if (!left || !right) return false

  if (!(Array.isArray(left) && Array.isArray(right))) {
    return false
  }

  return left.every((el, i) => (Array.isArray(el) ? deepEqual(el, right[i]) : right.includes(el)))
}

function isSpecialTag(attrs: BlockAttributes): attrs is BlockAttributesWithTag {
  return attrs.length > 1
}

const tagAttribute: Record<BlockTagTypes, (tag: BlockTagTypes, ...attr: string[]) => string> = {
  a: (tag, href) => `href="${href}"`,
}

function getStyle(styles: BlockStyleTags[]) {
  if (Array.isArray(styles) && styles?.length) {
    return `data-style="${styles.join('')}"`
  }

  return ''
}



export function createWalker(node: Node): TreeWalker | null {
  return node
    ? document.createTreeWalker(node, NodeFilter.SHOW_TEXT)
    : null
}
