import { useEffect, useState } from 'react';
import useUserInit from './useUserInit.ts';

export const useInitializer = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const user = useUserInit();

  useEffect(() => {
    if (user) {
      setIsInitialized(true);
    }
  }, [user]);

  return isInitialized;
};
