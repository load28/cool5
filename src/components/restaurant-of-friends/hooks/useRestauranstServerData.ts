import { useQuery } from 'react-query';
import useSupabaseQuery from '../../../hooks/useSupabaseQuery';
import { QueryKeys } from '../../../query-client';
import { Restaurant } from '../models';
import { list } from './test-data';

const useRestaurantServerData = () => {
  useSupabaseQuery();
  const { data, isLoading } = useQuery<Restaurant[]>(QueryKeys.RESTAURANTS, () => {
    return list;
  });

  return {
    data,
    isLoading,
  };
};

export default useRestaurantServerData;
