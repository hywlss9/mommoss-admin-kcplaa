import type { AntdTableDataSource } from '@type/antd-table';
import type { components } from '@type/model';
import type { Get } from '@type/util';

// 회원 리스트
type GetAssociationMembersResponse =
  components['schemas']['List$KcplaaMember$n1qL2LgK1wWloKVbny6I_Q'];

// 회원 그룹 생성
type CreateAssociationData = components['schemas']['CreateAssociationTeamDto'];

// 회원 그룹 리스트
type GetAssociationResponse = components['schemas']['List$GroupTeam$bAWYL_-5OVRyU0WyEV3CXQ'];

type AssociationListItem = Get<GetAssociationResponse['rows']>;

type AssociationTableDataSource = AntdTableDataSource<AssociationListItem>;

type AssociationTableData = Get<AntdTableDataSource>;

// 회원 그룹 상세
type GetAssociationDetailResponse = components['schemas']['GroupTeam$Pwfmxii4q5NdRDYj9WD7Qw'];

//회원 그룹 멤버 추가
type CreateAssociationMembersData = components['schemas']['AddMembersToAssociationTeamDto'];

export type {
  GetAssociationMembersResponse,
  CreateAssociationData,
  GetAssociationResponse,
  AssociationListItem,
  AssociationTableDataSource,
  AssociationTableData,
  GetAssociationDetailResponse,
  CreateAssociationMembersData,
};
