import request, { RequestDocument } from 'graphql-request';
import { QueryClient } from 'react-query';

export interface QueryClientParams {
  path: string;
}

export const getClient = (() => {
  let client: QueryClient | null = null;

  return () => {
    if (client) {
      return client;
    }

    client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          cacheTime: Infinity,
          refetchOnMount: false,
          refetchOnReconnect: false,
          refetchOnWindowFocus: false,
        },
      },
    });

    return client;
  };
})();

const BASE_URL = import.meta.env.VITE_SERVER_URL as string;

export const graphqlFetcher = (query: RequestDocument, variables = {}) =>
  request(`${BASE_URL}/graphql`, query, variables, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': BASE_URL,
  });

export const QueryKeys = {
  RESTAURANTS: 'RESTAURANTS',
};
