import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, HttpLink, concat } from '@apollo/client'
import { BatchHttpLink } from '@apollo/link-batch-http'
import { onError } from '@apollo/client/link/error'
import Router from 'next/router'

let apolloClient

function createIsomorphLink() {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema')
    const { schema } = require('../schema')
    return new SchemaLink({ schema })
  } else {
    const httpLink = new BatchHttpLink({
      uri: '/api/gql',
      credentials: 'same-origin',
      batchInterval: 10,
    })
    const logoutLink = onError(({ networkError }) => {
      if ((networkError as any)?.statusCode === 401) {
        window.sessionStorage.setItem('signInRedirectUrl', window.location.pathname)
        Router.push('/signin')
      }
    })

    return concat(logoutLink, httpLink)
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
