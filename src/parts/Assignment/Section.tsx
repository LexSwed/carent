import React from 'react'
import { DocumentNode, gql } from '@apollo/client'
import { Flex, TextField } from '@fxtrot/ui'

type Props = GetAssignmentDetailsQuery['assignment']['sections'][number]

const Section: React.FC<Props> & { fragment: DocumentNode } = ({ id, title, description }) => {
  return (
    <Flex>
      <TextField defaultValue={title} size="lg" placeholder="Section title" variant="transparent" />
      <TextField defaultValue={description} placeholder="Description of the section" variant="transparent" size="sm" />
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
      id
      title
      description
    }
  }
`
