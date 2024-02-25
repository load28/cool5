import { useEffect } from 'react';
import useAppNavigator from '../../core/navigator/useNavigator.ts';
import useSupabaseClient from '../../core/supabase/useSupabaseClient.ts';

const callback = () => {
  const supabase = useSupabaseClient();
  const { onNavigate } = useAppNavigator();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        onNavigate({ type: 'root', queryString: {} });
      }
    });
  }, []);

  return <></>;
};

export default callback;
