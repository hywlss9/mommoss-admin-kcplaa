import { store } from '@reduce';
import { setAuth } from '@reduce/auth';
import { setGroup } from '@reduce/group';
import { closeAllModals } from '@reduce/modals';

import { logout as logoutApi } from '@api/auth/logout';

import { removeCookie } from '@utils/cookie';

import { removeHasKeepLogin, removeRefreshToken } from './localStorage';

function logout() {
  logoutApi();
  removeCookie('login-uuid');
  store.dispatch(setAuth({ accessToken: null }));
  store.dispatch(setGroup(null));
  store.dispatch(closeAllModals());
  removeRefreshToken();
  removeHasKeepLogin();
  window.location.href = '/';
}

export default logout;
