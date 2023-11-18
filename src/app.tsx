import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRoutes } from 'react-router-dom';
import { getSessionUser } from './pages/auth/supabase.ts';
import { getClient } from './query-client.ts';
import { routes } from './routers.tsx';
import { useUserStore } from './stores/user.ts';

const App = () => {
  const queryClient = getClient();
  const element = useRoutes(routes);
  const updateUser = useUserStore((state) => state.updateUser);

  getSessionUser().then((userInfo: any) => {
    if (userInfo) {
      updateUser({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.user_metadata.full_name,
        profileImageUrl: userInfo.user_metadata.avatar_url,
      });
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      {element}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
