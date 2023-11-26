import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QueryKeys } from '../../../query-client.ts';
import { useSearchKeywordStore } from '../../../stores/search-keyword.ts';
import FloatButton from '../../../ui/button/float-button.tsx';
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
  const navigate = useNavigate();
  const searchKeyword = useSearchKeywordStore((state) => state.searchKeyword);
  const { data, isLoading } = useQuery<Restaurant[]>(QueryKeys.RESTAURANTS, () => {
    return list;
  });

  const onShareHandler = () => {
    navigate('/feed/create_share');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredData = data!.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  if (searchKeyword && filteredData.length === 0) {
    return <SearchEmpty message={`${searchKeyword}에 대한 결과가 없습니다`} />;
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
        {filteredData.map((restaurant) => (
          <ListItem {...restaurant} key={restaurant.id}></ListItem>
        ))}
      </div>
      <FloatButton className="sticky left-[100%] bottom-10" onClick={onShareHandler}>
        <i className="bi bi-plus-circle" style={{ fontSize: '38px', lineHeight: '38px' }}></i>
      </FloatButton>
    </div>
  );
};

export default List;
