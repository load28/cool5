import { useQuery } from 'react-query';
import { QueryKeys } from '../../../query-client';
import { Restaurant } from '../models';
import { list } from './test-data';

const useRestaurantServerData = () => {
  const { data, isLoading } = useQuery<Restaurant[]>(QueryKeys.RESTAURANTS, () => {
    return list;
  });

  return {
    data,
    isLoading,
  };
};

export default useRestaurantServerData;
