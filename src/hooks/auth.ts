import { useUserStore } from '../stores/user';

const useAuth = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
  }

  return user;
};

export default useAuth;
