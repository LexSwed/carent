import { signIn, useSession } from 'next-auth/client'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Heading, TextField, Flex, Button, Box } from '@fxtrot/ui'

const SignIn = () => {
  const [session] = useSession()

  if (session) {
    Router.push('/')
  }

  async function handleSignIn(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    await signIn('email', { email: form.get('email') })
  }

  return (
    <>
      <Head>
        <title>Carent - Sign In</title>
      </Head>
      <Flex main="center" cross="center" as={Box} width="100vw" height="100vh">
        <Box>
          <Heading as="h2">Sign in</Heading>
          <Box minWidth="320px" maxWidth="500px" width="100%">
            <Flex cross="end" space="$4" as="form" onSubmit={handleSignIn}>
              <TextField
                type="email"
                id="email"
                name="email"
                label="Email address"
                placeholder="john.doe@email.com"
                required
              />
              <Button main="center" type="submit">
                Sign In
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default SignIn
