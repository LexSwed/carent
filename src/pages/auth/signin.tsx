import { useSession } from 'next-auth/client'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Heading, TextField, Flex, Button, Box } from '@fxtrot/ui'
import { getCsrfToken } from 'next-auth/client'

import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'

const SignIn: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ csrfToken }) => {
  const [session] = useSession()

  if (session) {
    Router.push('/')
  }

  return (
    <>
      <Head>
        <title>Carent - Sign In</title>
      </Head>
      <Flex main="center" cross="center" as={Box as any} width="100vw" height="100vh">
        <Box>
          <Heading level={2}>Sign in</Heading>
          <Box minWidth="320px" maxWidth="500px" width="100%">
            <Flex cross="end" gap="4" as={'form' as any} method="post" action="/api/auth/signin/email">
              <TextField
                type="email"
                id="email"
                name="email"
                label="Email address"
                placeholder="john.doe@email.com"
                required
              />
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <Button main="center" type="submit" variant="primary">
                Sign In
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

export default SignIn
