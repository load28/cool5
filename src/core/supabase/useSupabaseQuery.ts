import useSupabaseClient from './useSupabaseClient';

const useSupabaseQuery = () => {
  const supabase = useSupabaseClient();
  supabase
    .from('post')
    .select('*')
    .then(({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }

      console.log(data);
    });
};

export default useSupabaseQuery;
