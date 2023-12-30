import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUser';

export const useInitializer = () => {
  const user = useUser();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (user) {
      setIsInitialized(true);
    }
  }, [user]);

  return isInitialized;
};
