import type {
  Block,
  BlockAttributes,
  BlockAttributesWithTag,
  BlockStylesAttribute,
  BlockStyleTags,
  BlockTagTypes,
} from './types'

export function parseBlock(content: Block['content']): string {
  return content.reduce((res, [text, attrs], index) => {
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

    res += `<${tag} ${tagAttrs} data-item="${index}" ${style}>${text}</${tag}>`

    return res
  }, '')
}

export function parseTreeToContent(walker: TreeWalker, currentContent: Block['content']): Block['content'] {
  // the node is empty
  if ('' === walker.root.textContent) {
    return [['', []]]
  }
  const newContent: Block['content'] = []
  let currentNode = walker.nextNode()

  while (currentNode) {
    const attrs: BlockAttributes = currentContent[(currentNode as HTMLElement).dataset.item]?.[1] || []
    if (deepEqual(attrs, newContent[newContent.length - 1]?.[1])) {
      newContent[newContent.length - 1][0] += currentNode.textContent
    } else {
      newContent.push([currentNode.textContent, attrs])
    }

    currentNode = walker.nextNode()
  }
  walker.currentNode = walker.root

  // block was cleared up so the only parent was root itself
  if (newContent.length === 0) {
    newContent.push([walker.currentNode.textContent, []])
  }

  return newContent
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
