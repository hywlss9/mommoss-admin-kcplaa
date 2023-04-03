import type { GetGroupMembersResponse } from '@api/group/getGroupMembers';

import type { components } from '@type/model';
import type { Get } from '@type/util';

type MemberData = Get<GetGroupMembersResponse['rows']>;

type CreateMemberData = components['schemas']['CreateGroupOrganizationMemberDto'];

type CreateMembersData = components['schemas']['BulkCreateGroupOrganizationMemberDto'];

export type { CreateMemberData, CreateMembersData, MemberData };
