import { PropsWithoutRef } from 'react';
import './list-item.scss';
import { Restaurant } from './list.tsx';

interface ListItemProps {
  restaurant: Restaurant;
}

const ListItem = ({ restaurant }: PropsWithoutRef<ListItemProps>) => {
  return (
    <div className="card sm:flex-col">
      <div className="flex flex-1 lg:flex-auto flex-col min-w-0">
        <div className="text-2xl flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-800 font-medium">
          {restaurant.name}
        </div>
        <div className="mt-2 text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
          {restaurant.description}
        </div>
        <div className="mt-4 text-sm text-gray-700 flex flex-wrap gap-x-2 gap-y-0">
          {restaurant.tag.map((tag) => {
            return <span key={tag.id}>#{tag.name}</span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
