import { User, useUserStore } from '@core/stores/user';

export const useUser = (): User => {
  const userInfo = useUserStore((state) => state.user);

  if (!userGuard(userInfo)) {
    throw new InitializeError();
  }

  return userInfo;
};

const userGuard = (user: User | undefined): user is User => {
  return !!user;
};

class InitializeError extends Error {
  constructor() {
    super('User is not initialized');
  }
}
