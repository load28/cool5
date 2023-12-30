import { useQuery } from 'react-query';
import { QueryKeys } from '../../../core/query/query-client';
import useSupabaseClient from '../../../core/supabase/useSupabaseClient';
import { Restaurant } from '../models';

const useRestaurantServerData = () => {
  const supabase = useSupabaseClient();
  const { data, isLoading } = useQuery<Restaurant[]>(QueryKeys.RESTAURANTS, async () => {
    const { data, error } = (await supabase.from('post').select('*')) as {
      data: { id: string; title: string; description: string; author_id: string; score: number }[];
      error: unknown;
    };

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
