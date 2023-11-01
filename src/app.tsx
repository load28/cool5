import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRoutes } from 'react-router-dom';
import { getClient } from './query-client.ts';
import { routes } from './routers.tsx';

const App = () => {
  const queryClient = getClient();
  const element = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>
      {element}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
