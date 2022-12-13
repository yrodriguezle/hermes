import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import offInProgress from '../../Redux/actions/inProgress/offInProgress';
import onInProgress from '../../Redux/actions/inProgress/onInProgress';
import receiveUser from '../../Redux/actions/user/receiveUser';
import useCallbackGetLoggedUser from './useCallbackGetLoggedUser';

function useMakeLogin() {
  const dispatch = useDispatch();
  const getLoggedUser = useCallbackGetLoggedUser();

  return useCallback(
    async () => {
      try {
        dispatch(onInProgress('fetchUser'));
        const { data } = await getLoggedUser();
        if (data && 'account' in data) {
          const { account: { currentUser } } = data;
          dispatch(receiveUser(currentUser));
          return currentUser;
        }
        return null;
      } finally {
        dispatch(offInProgress('fetchUser'));
      }
    },
    [dispatch, getLoggedUser],
  );
}

export default useMakeLogin;
