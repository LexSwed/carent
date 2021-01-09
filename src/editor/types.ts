
export type BlockStyleTags = 'b' | 's' | 'i' | 'u'
export type BlockTagTypes = 'a'

export type BlockTagAttributes = [BlockTagTypes, string]
export type BlockStylesAttribute = BlockStyleTags[]

export type BlockAttributesWithTag = [BlockTagAttributes, BlockStylesAttribute]
export type BlockAttributesOnly = [BlockStylesAttribute]
export type BlockAttributes = BlockAttributesWithTag | BlockAttributesOnly | []

type BlockContent = [text: string, attrs?: BlockAttributes]

export interface Block {
  id: string
  layout: 'full' | 'left' | 'right'
  type: 'p' | 'img' | 'li' | 'blockquote'
  content: BlockContent[]
}
