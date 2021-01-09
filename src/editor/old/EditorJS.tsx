import React, { useEffect, useRef } from 'react'
import { css, styled } from '@fxtrot/ui'

const blockStyle = {
  h1: css({
    fontSize: '$2xl',
  }),
  h2: css({
    fontSize: '$xl',
  }),
  h3: css({
    fontSize: '$lg',
  }),
  h4: css({
    fontSize: '$lg',
  }),
  p: css({}),
}

const Container = styled('div', {
  'maxWidth': '720px',
  '& .ce-block__content': {},
})

const Editor = () => {
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    async function setup() {
      const { default: EditorJS } = await import('@editorjs/editorjs')

      return new EditorJS({
        holder: ref.current,
      })
    }

    const editor = setup()

    return () => {
      editor.then((instance) => instance?.destroy?.())
    }
  }, [])

  return <Container ref={ref} />
}

export default Editor
