import React from 'react'
import { DocumentNode, gql, useMutation } from '@apollo/client'
import { Flex, TextField } from '@fxtrot/ui'

type Props = GetAssignmentDetailsQuery['assignment']['sections'][number]

const Section: React.FC<Props> & { fragment: DocumentNode } = ({ id, title, description }) => {
  // const onBlur = useUpdate({ id, title, description })
  return (
    <Flex as="form">
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

Section.fragment = gql`
  fragment AssignmentSectionFragment on AssignmentSection {
    id
    title
    description
  }
`

export default Section

const updateMutation = gql`
  mutation updateAssignmentSection($id: ID!, $section: AssignmentSectionUpdateInput!) {
    updateAssignmentSection(id: $id, section: $section) {
      ...AssignmentSectionFragment
    }
  }
  ${Section.fragment}
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
