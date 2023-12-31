import { useEffect } from 'react';
import useAppNavigator from '../../core/navigator/useNavigator';
import useSupabaseClient from '../../core/supabase/useSupabaseClient';

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
