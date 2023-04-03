import type { components } from '@type/model';
import type { Get } from '@type/util';

// 조직 추가
type CreateOrganizationData = components['schemas']['CreateOrganizationTeamDto'];

// 조직도 리스트
type GetOrganizationResponse = components['schemas']['List$GroupTeam$3v0y0DsS7WhHYRVd62tf0Q'];

type GetOrganizationDetailResponse = components['schemas']['GroupTeam$DnIbOsRmhaLh37gBU9m5BA'];

type OrganizationList = GetOrganizationResponse['rows'];

type Organization = Get<OrganizationList>;

export type {
  CreateOrganizationData,
  GetOrganizationResponse,
  GetOrganizationDetailResponse,
  OrganizationList,
  Organization,
};
