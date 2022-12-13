import { removeAuthToken, removeLastActivity, removeRememberPassword } from '../../../Common/auth';
import receiveLogout from './receiveLogout';

const logout = (navigate, client) => (dispatch) => {
  removeAuthToken();
  removeLastActivity();
  removeRememberPassword();
  dispatch(receiveLogout());
  if (client) {
    client.resetStore();
  }
  if (navigate) {
    navigate('/login');
  } else {
    window.location.reload();
  }
};

export default logout;
