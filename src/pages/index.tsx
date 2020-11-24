import { getSession } from 'next-auth/client'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
import { useEffect } from 'react'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: React.FC<Props> = ({ redirectUrl }) => {
  useEffect(() => {
    if (redirectUrl) {
      Router.push(redirectUrl)
    }
  }, [])

  return null
}

export default Home

export const getServerSideProps: GetServerSideProps<{ redirectUrl?: string }> = async ({ req }) => {
  const session = await getSession({ req })

  if (session?.user?.name) {
    return {
      props: {},
    }
  }

  if (session?.user?.email) {
    return {
      props: {
        redirectUrl: '/auth/new',
      },
    }
  }

  return {
    props: {
      redirectUrl: '/auth/signin',
    },
  }
}
