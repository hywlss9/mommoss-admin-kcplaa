import { store } from '@reduce';
import { resetAuth } from '@reduce/auth';
import { resetGroup } from '@reduce/group';
import { closeAllModals } from '@reduce/modals';

import { logout as logoutApi } from '@api/auth/logout';

import { removeCookie } from '@utils/cookie';

import { removeHasKeepLogin, removeRefreshToken } from './localStorage';

function logout() {
  logoutApi();
  removeCookie('login-uuid');
  store.dispatch(resetAuth());
  store.dispatch(resetGroup());
  store.dispatch(closeAllModals());
  removeRefreshToken();
  removeHasKeepLogin();
  window.location.href = '/';
}

export default logout;
