import { useSearchKeywordStore } from '../../../core/stores/search-keyword';
import { Restaurant } from '../models';

const useSearch = (data: Restaurant[] | undefined) => {
  const searchKeyword = useSearchKeywordStore((state) => state.searchKeyword);
  const filteredData =
    data?.filter((restaurant) => {
      return restaurant.title.toLowerCase().includes(searchKeyword.toLowerCase());
    }) || [];

  return {
    filteredData,
    searchKeyword,
  };
};

export default useSearch;
