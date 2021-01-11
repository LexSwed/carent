import {
  ApplySchemaAttributes,
  CommandFunction,
  extensionDecorator,
  ExtensionPriority,
  ExtensionTag,
  NodeExtension,
  NodeExtensionSpec,
  ProsemirrorAttributes,
  setBlockType,
} from '@remirror/core'

interface Options {
  optional?: string | null
}
@extensionDecorator({
  defaultOptions: {},
  defaultPriority: ExtensionPriority.Medium,
})
export class BlockExtension extends NodeExtension<Options> {
  get name() {
    return 'block' as const
  }

  readonly tags = [ExtensionTag.LastNodeCompatible, ExtensionTag.BlockNode]

  createNodeSpec(extra: ApplySchemaAttributes): NodeExtensionSpec {
    return {
      content: 'block',
      attrs: {
        ...extra.defaults(),
      },
      draggable: true,
      group: 'block+',
      parseDOM: [
        {
          tag: 'div',
          getAttrs: (node) => ({
            ...extra.parse(node),
          }),
        },
      ],

      toDOM: (node) => {
        return ['div', extra.dom(node), 0]
      },
    }
  }

  /**
   * Provides the commands that this extension uses.
   */
  createCommands() {
    return {
      createTextBlock: (attributes: ProsemirrorAttributes): CommandFunction => {
        return setBlockType(this.type, attributes)
      },
    }
  }
}
