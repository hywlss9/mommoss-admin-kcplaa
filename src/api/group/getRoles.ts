import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetRolesQuery = operations['AdminGroupRoleController_getGroupRoleList']['parameters']['query'];
type GetRolesHeaders =
  operations['AdminGroupRoleController_getGroupRoleList']['parameters']['header'];

interface GetRolesProps {
  query: GetRolesQuery;
  headers?: OmitGroupIdInHeader<GetRolesHeaders>;
}

type GetRolesResponse = components['schemas']['List$GroupRole$l332XqYp873s5b6FWQXPSA'];

export async function getRoles({ query, headers }: GetRolesProps): Promise<GetRolesResponse> {
  const response = await authenticateRequest<GetRolesResponse>({
    method: 'get',
    url: `/api/v1/admin/roles`,
    headers,
    params: query,
  });

  console.log('getRoles', { response });
  return response;
}

export type { GetRolesQuery, GetRolesResponse };
