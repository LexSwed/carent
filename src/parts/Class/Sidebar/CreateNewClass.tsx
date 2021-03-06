import React from 'react'
import { Button, Flex, Icon, Dialog, Heading, Box, TextField, Text, ComboBox, Item } from '@fxtrot/ui'
import { PlusIcon } from '@heroicons/react/outline'
import { gql, MutationHookOptions, useMutation, useQuery } from '@apollo/client'
import Router from 'next/router'

const newClassFragment = gql`
  fragment ClassFragment on Class {
    id
    name
    group {
      id
      code
    }
  }
`

const groupGragment = gql`
  fragment GroupFragment on StudentGroup {
    id
    code
  }
`

const createClassMutation = gql`
  mutation createClass($name: String!, $group: CreateClassGroupInput!) {
    createClass(name: $name, group: $group) {
      ...ClassFragment
    }
  }
  ${newClassFragment}
`

const getGroupsQuery = gql`
  query getGroups {
    groups(first: 10) {
      edges {
        node {
          ...GroupFragment
        }
      }
    }
  }
  ${groupGragment}
`

const CreateNewClass: React.FC<{ defaultOpen: boolean }> = ({ defaultOpen }) => {
  return (
    <Dialog defaultOpen={defaultOpen}>
      <Button main="center" variant="flat">
        <Icon as={PlusIcon} />
        <span>Create new class</span>
      </Button>
      {(close) => <NewGroupModal close={close} />}
    </Dialog>
  )
}

export default CreateNewClass

function NewGroupModal({ close }: { close: () => void }) {
  const [createClass, { error, loading }] = useCreateClassMutation()
  const { data } = useQuery<GetGroupsQuery>(getGroupsQuery)

  const [className, setClassName] = React.useState<string>('')
  const [groupId, setGroupId] = React.useState<string | null>(null)
  const [newGroupCode, setNewGroupCode] = React.useState('')

  const inputProps = {
    'aria-describedby': 'students-code-hint',
    'label': 'Student group code',
    'secondaryLabel': '(Required)',
    'placeholder': '11-A',
    'name': 'code',
    'id': 'code',
    'maxLength': 10,
    'autoComplete': 'off',
    'required': true,
    'value': newGroupCode,
    'onChange': setNewGroupCode,
  } as const

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let name = className.trim()
    let code = newGroupCode.trim()

    if (!name && (groupId || code)) {
      return
    }

    const { data } = await createClass({
      variables: {
        name,
        group: groupId
          ? {
              id: groupId,
            }
          : {
              code,
            },
      },
    })

    close()

    Router.push(`/${data.createClass.id}`)
  }

  return (
    <Dialog.Modal>
      <Flex gap="8">
        <Heading>Create new class</Heading>
        <Box display="contents" as="form" onSubmit={handleSubmit as any}>
          <Flex gap="4">
            {error && <Text tone="danger">{error.message}</Text>}
            <TextField
              label="Class name"
              secondaryLabel="(Required)"
              placeholder="Defence Against the Dark Arts"
              hint="The name of the class you teach"
              name="name"
              autoComplete="off"
              id="name"
              required
              value={className}
              onChange={setClassName}
            />
            <Flex>
              <Box width="$32">
                {data?.groups.edges.length ? (
                  <ComboBox {...inputProps} value={groupId} onChange={setGroupId} onInputChange={setNewGroupCode}>
                    {data?.groups.edges.map((group) => (
                      <Item key={group.node.id} value={group.node.id} label={group.node.code} />
                    ))}
                  </ComboBox>
                ) : (
                  <TextField {...inputProps} />
                )}
              </Box>
              <Text id={inputProps['aria-describedby']} size="xs" tone="light">
                You'll be adding students to this group
              </Text>
            </Flex>
          </Flex>
          <Flex flow="row-reverse" gap="4">
            <Button disabled={loading} type="submit">
              Create
            </Button>
            <Button disabled={loading} onClick={close} variant="flat">
              Cancel
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Dialog.Modal>
  )
}

const updateCache: MutationHookOptions<CreateClassMutation, CreateClassMutationVariables> = {
  update(cache, { data: { createClass: item } }) {
    cache.modify({
      fields: {
        groups(existingGroups = {}, { readField }) {
          if (existingGroups.edges.some((edge) => readField('id', edge.node) === item.group.id)) {
            return existingGroups
          }
          const newGroupRef = cache.writeFragment({
            data: item.group,
            fragment: groupGragment,
          })
          return {
            ...existingGroups,
            edges: [
              ...existingGroups.edges,
              {
                node: newGroupRef,
              },
            ],
          }
        },
        classes(existingClasses = {}) {
          const newClassRef = cache.writeFragment({
            data: item,
            fragment: newClassFragment,
          })
          return {
            ...existingClasses,
            edges: [
              ...existingClasses.edges,
              {
                node: newClassRef,
              },
            ],
          }
        },
      },
    })
  },
}

function useCreateClassMutation() {
  return useMutation<CreateClassMutation, CreateClassMutationVariables>(createClassMutation, updateCache)
}
