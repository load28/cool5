import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  profileImageUrl: string;
}

interface UserStore {
  user: User | undefined;
  updateUser: (user: User) => void;
  deleteUser: () => void;
}

export const useUserStore = create<UserStore>((set) => {
  return {
    user: undefined,
    updateUser: (user: User) => set({ user: user }),
    deleteUser: () => set({ user: undefined }),
  };
});
