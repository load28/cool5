import { useEffect } from 'react';
import useAppNavigator from '@core/navigator/useNavigator';
import supabaseClient from '@core/supabase/supabaseClient';

const Callback = () => {
  const supabase = supabaseClient();
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

export default Callback;
