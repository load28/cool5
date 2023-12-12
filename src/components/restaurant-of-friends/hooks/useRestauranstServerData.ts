import { useQuery } from 'react-query';
import useSupabaseClient from '../../../hooks/useSupabaseClient';
import { QueryKeys } from '../../../query-client';
import { Restaurant } from '../models';

const useRestaurantServerData = () => {
  const supabase = useSupabaseClient();
  const { data, isLoading } = useQuery<Restaurant[]>(QueryKeys.RESTAURANTS, async () => {
    const { data, error } = await supabase.from('post').select('*');

    if (error) {
      return [];
    }

    return data.map((item) => {
      return {
        id: item.id,
        title: item.title,
        authorId: item.author_id,
        description: item.description,
        score: item.score,
        tag: [],
      };
    });
  });

  return {
    data,
    isLoading,
  };
};

export default useRestaurantServerData;
