import { useQuery } from 'react-query';
import { QueryKeys } from '../../../query-client.ts';
import { useSearchKeywordStore } from '../../../stores/search-keyword.ts';
import { list } from '../test-data.ts';
import ListItem from './list-item.tsx';
import SearchEmpty from './search-empty.tsx';

interface Tag {
  id: string;
  name: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  score: 1 | 2 | 3 | 4 | 5;
  tag: Tag[];
  authorId: string;
}

const List: React.FC = () => {
  const searchKeyword = useSearchKeywordStore((state) => state.searchKeyword);
  const { data } = useQuery<Restaurant[]>(QueryKeys.RESTAURANTS, () => {
    return list;
  });

  const filteredData = data?.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  if (!filteredData || filteredData.length === 0) {
    return <SearchEmpty message={`${searchKeyword}에 대한 결과가 없습니다`} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
      {filteredData.map((restaurant) => (
        <ListItem {...restaurant} key={restaurant.id}></ListItem>
      ))}
    </div>
  );
};

export default List;
