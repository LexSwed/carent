import React from 'react'
import { styled, TextField, VisuallyHidden } from '@fxtrot/ui'

type Props = Omit<React.ComponentProps<typeof TextField>, 'onSubmit'> & {
  onSubmit: (field: HTMLInputElement) => void
  submitText: string
}

const Form = styled('form', {
  width: '100%',
})

const SingleFieldForm = ({ onSubmit, submitText, name, ...props }: Props) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        const answer = e.currentTarget.elements.namedItem(name) as HTMLInputElement
        if (answer) {
          onSubmit(answer)
          answer.value = ''
        }
      }}
    >
      <TextField name={name} {...(props as any)} autoComplete="off" autoCorrect="off" />
      <VisuallyHidden {...({ as: 'button' } as any)} type="submit">
        {submitText}
      </VisuallyHidden>
    </Form>
  )
}

export default SingleFieldForm
