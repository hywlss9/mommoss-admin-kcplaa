import { authenticateRequest } from '@api/authenticateRequest';

export async function logout(props?: { test?: boolean }): Promise<any> {
  if (props?.test) return true;

  const response = await authenticateRequest<any>({
    method: 'delete',
    url: `/api/v1/auth/logout`,
    isAuthorization: true,
    notUseToken: true,
    useGroupId: false,
    notRefresh: true,
  });

  console.log('logout', { response });
  return response;
}
