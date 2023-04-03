import { store } from '@reduce';
import { setAuth } from '@reduce/auth';

import { authenticateRequest } from '@api/authenticateRequest';
import testRequest from '@api/testRequest';

import { getRefreshToken } from '@utils/localStorage';

interface GetTokenProps {
  test?: boolean;
}

interface GetTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export async function getToken(props?: GetTokenProps): Promise<GetTokenResponse> {
  if (props?.test) {
    store.dispatch(setAuth({ accessToken: 'accessToken' }));
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

  if (response.accessToken) store.dispatch(setAuth({ accessToken: response.accessToken }));
  if (response.refreshToken) localStorage.setItem('refreshToken', response.refreshToken);

  return response;
}
