import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
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

interface ListContentProps {
  filteredData: Restaurant[]; // Restaurant는 필요에 따라 적절한 타입으로 변경하세요
  onShareHandler: () => void;
}

const useRestaurantServerData = () => {
  const { data, isLoading } = useQuery<Restaurant[]>(QueryKeys.RESTAURANTS, () => {
    return list;
  });

  return {
    data,
    isLoading,
  };
};

const useSearch = (data: Restaurant[]) => {
  const searchKeyword = useSearchKeywordStore((state) => state.searchKeyword);
  const filteredData = data?.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  return {
    filteredData,
    searchKeyword,
  };
};

const Loading = () => <div>Loading...</div>;

const ListContent: React.FC<ListContentProps> = ({ filteredData, onShareHandler }) => (
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

type CreateShare = {
  type: 'createShare';
  queryString: {
    params1: string;
    params2: string;
  };
};

type CreateShare2 = {
  type: 'createShare2';
  queryString: {
    params3: string;
    params4: string;
  };
};

type NavigationAction = CreateShare | CreateShare2;

const NAVIGATION_ACTIONS: Record<NavigationAction['type'], string> = {
  createShare: '/feed/create_share',
  createShare2: '/feed/create_share',
};

const useAppNavigatorr = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onNavigate = useCallback(
    ({ type, queryString: data }: NavigationAction) => {
      const path = NAVIGATION_ACTIONS[type];
      const queryString = Object.entries(data)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      navigate(`${path}?${queryString}`);
    },
    [navigate]
  );

  const getQueryString = useCallback(() => {
    return Object.fromEntries(new URLSearchParams(location.search));
  }, [location.search]);

  return {
    onNavigate,
    getQueryString,
  };
};

const List: React.FC = () => {
  const { data, isLoading } = useRestaurantServerData();
  const { searchKeyword, filteredData } = useSearch(data!);
  const { onNavigate } = useAppNavigatorr();

  if (isLoading) {
    return <Loading />;
  }

  if (searchKeyword && filteredData.length === 0) {
    return <SearchEmpty message={`${searchKeyword}에 대한 결과가 없습니다`} />;
  }

  return (
    <ListContent
      filteredData={filteredData}
      onShareHandler={() => {
        onNavigate({ type: 'createShare2', queryString: { params3: '1', params4: '2' } });
      }}
    />
  );
};

export default List;
