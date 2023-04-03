import { store } from '@reduce';
import { setToken } from '@reduce/auth';

import { authenticateRequest } from '@api/authenticateRequest';
import testRequest from '@api/testRequest';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { getRefreshToken } from '@utils/localStorage';

interface GetTokenProps {
  test?: boolean;
}

interface GetTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export async function getToken(props?: GetTokenProps): Promise<GetTokenResponse | false> {
  if (props?.test) {
    store.dispatch(setToken({ accessToken: 'accessToken' }));
    return testRequest<GetTokenResponse>({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });
  }

  const refreshToken = getRefreshToken();

  console.log('try refreshToken', { refreshToken });
  const response = await authenticateRequest<GetTokenResponse>({
    method: 'post',
    url: `/api/v1/auth/refresh`,
    isAuthorization: true,
    notUseToken: true,
    useGroupId: false,
    notRefresh: true,
  });

  console.log('getToken', { response });

  const isResponse = getIsResponseFalse(response);
  if (!isResponse && response.accessToken) {
    store.dispatch(setToken({ accessToken: response.accessToken }));
  }
  if (!isResponse && response.refreshToken) {
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  return response;
}
