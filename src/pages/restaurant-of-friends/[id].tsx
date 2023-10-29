import { useParams } from 'react-router-dom';

const restaurant: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Restaurant: {id}</h1>
    </div>
  );
};

export default restaurant;
