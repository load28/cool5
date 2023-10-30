import { useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRoutes } from 'react-router-dom';
import { getClient } from './query-client.ts';
import { routes } from './routers.tsx';

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
    };
  }
}

const App = () => {
  const queryClient = getClient();
  const element = useRoutes(routes);

  useEffect(() => {
    window.Kakao.init('610a190030519ebda6d08969857d4a51');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {element}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
