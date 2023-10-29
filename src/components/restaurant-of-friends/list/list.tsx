import { useQuery } from 'react-query';
import { QueryKeys } from '../../../query-client.ts';
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
  const { data } = useQuery<Restaurant[]>(QueryKeys.RESTAURANTS, () => {
    return list;
  });

  // const items = list.filter((restaurant) => {
  //   // return restaurant.name.toLocaleLowerCase().includes(searchKeyword.toLocaleLowerCase());
  //   return true;
  // });

  if (!data || data.length === 0) {
    return <SearchEmpty message={`에 대한 결과가 없음`} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
      {data.map((restaurant) => (
        <ListItem {...restaurant} key={restaurant.id}></ListItem>
      ))}
    </div>
  );
};

export default List;
