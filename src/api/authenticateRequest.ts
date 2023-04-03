import { message } from 'antd';
import axios from 'axios';
import type { Canceler } from 'axios';

import { store } from '@reduce/index';

import { getToken } from '@api/auth/getToken';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { getRefreshToken } from '@utils/localStorage';
import logout from '@utils/logout';

interface AuthenticateRequestProps {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
  headers?: any;
  data?: any;
  params?: any;
  isAuthorization?: boolean;
  isFile?: boolean;
  notRefresh?: boolean;
  isDownload?: boolean;
  useGroupId?: boolean;
  notUseToken?: boolean;
}

axios.defaults.adapter = require('axios/lib/adapters/http');

const CancelToken = axios.CancelToken;
let cancel: undefined | Canceler;

axios.interceptors.request.use(
  response => {
    console.log('request interceptors: ', { response });
    const { accessToken } = store.getState().auth;
    if (!response.url?.includes('auth') && !accessToken) {
      console.log('request not token');
      throw false;
    }

    return response;
  },
  error => {
    console.log('request interceptors: ', { error });
    if (error.response.status === 401 && typeof cancel !== 'undefined') {
      console.log('취소함');
      cancel();
    }
    return Promise.reject(error);
  },
);

export async function authenticateRequest<T = any>({
  url,
  method,
  headers,
  data,
  params,
  isAuthorization,
  isFile,
  isDownload,
  notRefresh,
  useGroupId = true,
  notUseToken = false,
}: AuthenticateRequestProps): Promise<T | false> {
  // axios 요청
  const request = async (token: string | null, refreshToken: string | null) => {
    const { groupInfo } = store.getState().group;

    const isUseToken = !url.includes('auth');
    console.log('request: ', { url, isUseToken, groupInfo });

    return await axios({
      url,
      method,
      data,
      params,
      timeout: 5000,
      headers: {
        ...(!notUseToken && { Authorization: `Bearer ${token}` }),
        ...(isAuthorization && { Authorization: `Bearer ${refreshToken}` }),
        ...(useGroupId && groupInfo && { 'x-group-id': String(groupInfo.id) }),
        ...(isFile && { content: 'multipart/form-data' }),
        ...headers,
      },
      ...(isDownload && { responseType: 'blob' }),
      ...(isUseToken && {
        cancelToken: new CancelToken(c => {
          cancel = c;
        }),
      }),
    });
  };

  // 401 토큰 에러로 인한 재요청
  const retry = async () => {
    try {
      const tokenResponse = await getToken();
      if (getIsResponseFalse(tokenResponse)) return false;

      const { accessToken: currentToken, refreshToken: currentRefreshToken } = tokenResponse;
      const response = await request(currentToken, currentRefreshToken);

      return response.data;
    } catch (error: any) {
      message.error({
        content: '보안 토큰이 만료되었습니다. 다시 로그인해주세요.',
        key: 'expired-token',
      });
      logout();
      return false;
    }
  };

  // 첫 api 요청
  const tryApi = async () => {
    try {
      const { accessToken } = store.getState().auth;
      const refreshToken = getRefreshToken();
      console.log('tryRequest', { url, accessToken, refreshToken });

      const response = await request(accessToken, refreshToken);

      return response.data;
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log('tryApi 요청이 취소되었음 ', { url, error });
        return false;
      }

      const response = error.response;
      const errorMessage = response?.data?.message;

      if (!notRefresh && response?.status === 401) await retry();

      console.log({ error });
      if (errorMessage && response?.status !== 401) message.error(errorMessage);

      return false;
    }
  };

  return await tryApi();
}
