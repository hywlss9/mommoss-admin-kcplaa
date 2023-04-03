import type { AntdTableDataSource } from '@type/antd-table';
import type { GetOrganizationDetailResponse } from '@type/group';
import type { Get } from '@type/util';

interface OrganiztionMemberTableProps {
  selectedOrganizationId: number | undefined;
}

type MemberTableDataSource = AntdTableDataSource<
  Get<GetOrganizationDetailResponse['groupMembers']>
>;

type MemberTableData = Get<MemberTableDataSource>;

export type { OrganiztionMemberTableProps, MemberTableDataSource, MemberTableData };
