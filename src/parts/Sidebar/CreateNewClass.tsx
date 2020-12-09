import React, { useMemo } from 'react'
import { Button, Flex, Icon, Dialog, Heading, Box, TextField, Text } from '@fxtrot/ui'
import { HiPlus } from 'react-icons/hi'
import { gql, useMutation } from '@apollo/client'
import { CreateClassMutation, CreateClassMutationVariables } from '../../graphql/generated'
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

const createClassMutation = gql`
  mutation createClass($name: String!, $groupCode: String!) {
    createClass(name: $name, studentGroupCode: $groupCode) {
      ...ClassFragment
    }
  }
  ${newClassFragment}
`

const CreateNewClass: React.FC<{ defaultOpen: boolean }> = ({ defaultOpen }) => {
  const [createClass, { error, loading }] = useMutation<CreateClassMutation, CreateClassMutationVariables>(
    createClassMutation,
    useMemo(
      () => ({
        update(cache, { data: { createClass: item } }) {
          cache.modify({
            fields: {
              classes(existingClasses = {}) {
                const newClassRef = cache.writeFragment({
                  data: item,
                  fragment: newClassFragment,
                })
                return {
                  ...existingClasses,
                  totalCount: existingClasses.totalCount + 1,
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
      }),
      []
    )
  )

  return (
      <Dialog.Trigger defaultOpen={defaultOpen}>
        <Button main="center" variant="flat">
          <Icon as={HiPlus} />
          <span>Create new</span>
        </Button>
        {(close) => (
          <Dialog.Modal>
            <Flex space="$8">
              <Heading>Create new class</Heading>
              <Box
                display="contents"
                as="form"
                onSubmit={
                  (async (e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault()
                    const form = new FormData(e.currentTarget)

                    const { data } = await createClass({
                      variables: {
                        name: form.get('name') as string,
                        groupCode: form.get('code') as string,
                      },
                    })

                    close()

                    Router.push(`/${data.createClass.id}`)
                  }) as $tempAny
                }
              >
                <Flex space="$4">
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
                  />
                  <TextField
                    label="Student group code"
                    secondaryLabel="(Required)"
                    placeholder="11-A"
                    hint="You'll be adding students to this group"
                    name="code"
                    id="code"
                    maxLength={10}
                    autoComplete="off"
                    required
                  />
                </Flex>
                <Flex flow="row-reverse" space="$4">
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
        )}
      </Dialog.Trigger>
  )
}

export default CreateNewClass
