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
  }, [redirectUrl])

  return <div>Home</div>
}

export default Home

export const getServerSideProps: GetServerSideProps<{ redirectUrl?: string }> = async ({ req }) => {
  const session = await getSession({ req })

  if (!session?.user?.email) {
    return {
      props: {
        redirectUrl: '/auth/signin',
      },
    }
  }

  return {
    props: {},
  }
}

const Sidebar = () => {}
