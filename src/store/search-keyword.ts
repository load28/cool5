import { create } from 'zustand';

interface SearchKeywordStore {
  searchKeyword: string | undefined;
  updateSearchKeyword: (keyword: string) => void;
  deleteSearchKeyword: () => void;
}

export const useSearchKeywordStore = create<SearchKeywordStore>((set) => {
  return {
    searchKeyword: undefined,
    updateSearchKeyword: (keyword: string) => set({ searchKeyword: keyword }),
    deleteSearchKeyword: () => set({ searchKeyword: undefined }),
  };
});
