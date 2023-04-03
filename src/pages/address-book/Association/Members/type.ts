import type { SelectedAssociationMemberData } from '@pages/address-book/AssociationMembers/Table/type';

import type { AntdTableDataSource } from '@type/antd-table';
import type { GetAssociationDetailResponse } from '@type/group';
import type { Get } from '@type/util';

interface AssociationMemberTableProps extends SelectedAssociationMemberData {
  associationId?: number;
  pageSize?: number;
  header?: boolean;
  search?: boolean;
  tags?: 'top' | 'bottom';
  blackList?: string[];
}

type MemberTableDataSource = AntdTableDataSource<Get<GetAssociationDetailResponse['groupMembers']>>;

type MemberTableData = Get<MemberTableDataSource>;

export type { AssociationMemberTableProps, MemberTableDataSource, MemberTableData };
