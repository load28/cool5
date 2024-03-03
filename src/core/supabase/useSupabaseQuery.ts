import supabaseClient from './supabaseClient.ts';

const useSupabaseQuery = () => {
  const supabase = supabaseClient();
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
