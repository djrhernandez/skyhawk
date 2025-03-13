// ./apollo-provider.js
'use client'

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, WatchQueryFetchPolicy, ErrorPolicy } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import type { ReactNode } from 'react'

import { onError } from "@apollo/client/link/error";
import { TV_MODE } from "./app/lib/utils";
import { apiUrl } from "./app/lib/utils";
import { error } from 'console';

const httpLink = createHttpLink({
  // uri: 'http://127.0.0.1:5000/graphql', // For Dev Purpose
  uri: 'https://topflight.onrender.com/graphql',
  credentials: 'include', // can also be 'same-origin' depending on the setup
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  }
})

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      'X-TV-Mode': TV_MODE ? 'true' : '',
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const cacheOptions = {
  typePolicies: {
    Hotel: {
      keyFields: ["parid", "borocode"],
    }
  }
}

const client = new ApolloClient({
  name: 'Topflight-GraphQL',
  version: '1.0',
  queryDeduplication: false,
  assumeImmutableResults: true,
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(cacheOptions),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network' as WatchQueryFetchPolicy,
      errorPolicy: 'all' as ErrorPolicy,
    },
  },
})

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}