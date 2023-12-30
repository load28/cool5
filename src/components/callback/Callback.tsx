import { useEffect } from 'react';
import useAppNavigator from '../../core/navigator/useNavigator';
import { useUser } from '../../hooks/useUser';

const callback = () => {
  const userInfo = useUser();
  const { onNavigate } = useAppNavigator();

  useEffect(() => {
    if (userInfo) {
      onNavigate({ type: 'feedList', queryString: {} });
    }
  }, [userInfo]);

  return <></>;
};

export default callback;
