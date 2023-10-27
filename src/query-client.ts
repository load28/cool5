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
