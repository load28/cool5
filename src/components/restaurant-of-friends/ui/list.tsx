import { Restaurant } from '../models';
import ListItem from './ListItem';

interface ListProps {
  filteredData: Restaurant[]; // Restaurant는 필요에 따라 적절한 타입으로 변경하세요
}

const List: React.FC<ListProps> = ({ filteredData }) => (
  <div className="relative min-h-full">
    {/*<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">*/}
    <div className="flex flex-col gap-y-2">
      {filteredData.map((restaurant) => (
        <ListItem {...restaurant} key={restaurant.id}></ListItem>
      ))}
    </div>
  </div>
);

export default List;
