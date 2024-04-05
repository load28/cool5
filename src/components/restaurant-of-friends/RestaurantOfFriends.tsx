import useRestaurantServerData from '@components/restaurant-of-friends/hooks/useRestauranstServerData';
import useSearch from './hooks/useSearch';
import List from './ui/List';
import SearchEmpty from './ui/SearchEmpty';

const RestaurantOfFriends: React.FC = () => {
  const { data } = useRestaurantServerData();
  const { searchKeyword, filteredData } = useSearch(data);

  if (searchKeyword && filteredData.length === 0) {
    return <SearchEmpty message={`${searchKeyword}에 대한 결과가 없습니다`} />;
  }

  return <List filteredData={filteredData} />;
};

export default RestaurantOfFriends;
