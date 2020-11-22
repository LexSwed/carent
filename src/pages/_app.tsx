import Head from 'next/head'
import { ThemeProvider } from '@fxtrot/ui'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <Head>
        <title>Carent</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider theme="indigo">
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
      <style global jsx>
        {`
          body {
            margin: 0;
            body: 0;
          }
          body * {
            box-sizing: border-box;
          }
        `}
      </style>
    </>
  )
}

export default MyApp
