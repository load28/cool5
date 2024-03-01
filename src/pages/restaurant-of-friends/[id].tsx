import { useParams } from 'react-router-dom';

const restaurant: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // useQuery를 이용하여 restaurant 정보를 가져와야 합니다. (cache를 이용함)

  return (
    <div>
      <h1>Restaurant: {id}</h1>
    </div>
  );
};

export default restaurant;
