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

@extensionDecorator({
  defaultPriority: ExtensionPriority.Medium,
})
export class BlockExtension extends NodeExtension {
  get name() {
    return 'block' as const
  }

  readonly tags = [ExtensionTag.LastNodeCompatible, ExtensionTag.BlockNode]

  createNodeSpec(extra: ApplySchemaAttributes): NodeExtensionSpec {
    return {
      content: 'inline*',
      attrs: {
        ...extra.defaults(),
      },
      draggable: false,
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

  createNodeViews

  //   get view() {
  //     return {
  //       template: `
  //         <div data-type="drag_item" contenteditable="false">
  //           <div data-drag-handle></div>
  //           <div ref="content" contenteditable="true"></div>
  //         </div>
  //       `,
  //     }
  //   }

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
