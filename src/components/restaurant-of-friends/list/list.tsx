import { PropsWithoutRef } from 'react';
import { list } from '../test-data.ts';
import ListItem from './list-item.tsx';

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

interface ListProps {
  searchKeyword: string;
}

const List = ({ searchKeyword }: PropsWithoutRef<ListProps>) => {
  const items = list.filter((restaurant) => {
    return restaurant.name.includes(searchKeyword);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
      {items.map((restaurant) => {
        return <ListItem key={restaurant.id} restaurant={restaurant}></ListItem>;
      })}
    </div>
  );
};

export default List;
