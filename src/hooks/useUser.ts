import { User, useUserStore } from '../core/stores/user.ts';

export const useUser = (): User => {
  const userInfo = useUserStore((state) => state.user);

  if (!userGuard(userInfo)) {
    throw new Error('User is not initialized');
  }

  return userInfo;
};

const userGuard = (user: User | undefined): user is User => {
  return !!user;
};
