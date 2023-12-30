import { create } from 'zustand';

interface SearchKeywordStore {
  searchKeyword: string;
  updateSearchKeyword: (keyword: string) => void;
  deleteSearchKeyword: () => void;
}

export const useSearchKeywordStore = create<SearchKeywordStore>((set) => {
  return {
    searchKeyword: '',
    updateSearchKeyword: (keyword: string) => set({ searchKeyword: keyword }),
    deleteSearchKeyword: () => set({ searchKeyword: '' }),
  };
});
