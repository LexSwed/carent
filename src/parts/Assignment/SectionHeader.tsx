import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { Flex, TextField } from '@fxtrot/ui'
import { AssignmentSectionFragment } from './gql'

type Props = GetAssignmentDetailsQuery['assignment']['sections'][number]

const SectionHeader: React.FC<Props> = ({ id, title, description }) => {
  // const onBlur = useUpdate({ id, title, description })
  return (
    <Flex as="form" css={{ px: '$2' }}>
      <TextField name="title" defaultValue={title} size="lg" placeholder="Section title" variant="transparent" />
      <TextField
        name="description"
        defaultValue={description}
        placeholder="Description of the section"
        variant="transparent"
        size="sm"
      />
    </Flex>
  )
}

export default SectionHeader

const updateMutation = gql`
  mutation updateAssignmentSection($id: ID!, $section: AssignmentSectionUpdateInput!) {
    updateAssignmentSection(id: $id, section: $section) {
      ...AssignmentSectionFragment
    }
  }
  ${AssignmentSectionFragment}
`

function useUpdate({ id, title, description }: Partial<Props>) {
  const [update] = useMutation<UpdateAssignmentSectionMutation, UpdateAssignmentSectionMutationVariables>(
    updateMutation
  )
  const onBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const form = new FormData(e.currentTarget)
    const [newTitle, newDescription] = [form.get('title'), form.get('description')] as [string, string]
    console.log({
      variables: {
        id,
        section: {
          title: title === newTitle ? undefined : newTitle,
          description: newDescription === description ? undefined : newDescription,
        },
      },
    })
    update({
      variables: {
        id,
        section: {
          title: title === newTitle ? undefined : newTitle,
          description: newDescription === description ? undefined : newDescription,
        },
      },
    })
  }

  return onBlur
}
