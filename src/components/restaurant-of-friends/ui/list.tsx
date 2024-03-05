import FloatButton from '@ui/button/float-button';
import { Restaurant } from '../models';
import ListItem from './ListItem';

interface ListProps {
  filteredData: Restaurant[]; // Restaurant는 필요에 따라 적절한 타입으로 변경하세요
  onShareHandler: () => void;
}

const List: React.FC<ListProps> = ({ filteredData, onShareHandler }) => (
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

export default List;
