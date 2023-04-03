import { authenticateRequest } from '@api/authenticateRequest';
import testRequest from '@api/testRequest';

interface LoginProps {
  password: string;
  id: string;
  platform: string;
  deviceInfo?: {};
  uuid?: string;
  pushToken?: string;
  test?: boolean;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export async function login({
  id,
  password,
  deviceInfo,
  platform,
  uuid,
  test,
}: LoginProps): Promise<LoginResponse | false> {
  if (test) {
    return testRequest<LoginResponse>({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });
  }

  const response = await authenticateRequest<LoginResponse>({
    method: 'post',
    url: `/api/v1/auth/login`,
    data: { id, password, deviceInfo, platform, uuid },
    notUseToken: true,
    useGroupId: false,
  });

  console.log('login', { response });
  return response;
}
