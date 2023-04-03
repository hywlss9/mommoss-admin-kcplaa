import type { Dispatch, SetStateAction } from 'react';

import type { AntdTableDataSource } from '@type/antd-table';
import type { GetAssociationMembersResponse } from '@type/group';
import type { Get } from '@type/util';

type AssociationMembersListItem = Get<GetAssociationMembersResponse['rows']>;
type AssociationMembersDataSource = AntdTableDataSource<AssociationMembersListItem>;
type AssociationMembersData = Get<AssociationMembersDataSource>;

interface SelectedAssociationMemberData {
  selectedMembers?: AssociationMembersDataSource;
  setSelectedMembers?: Dispatch<SetStateAction<AssociationMembersDataSource>>;
}

interface MemberTableProps extends SelectedAssociationMemberData {
  pageSize?: number;
  header?: boolean;
  search?: boolean;
  tags?: 'top' | 'bottom';
  blackList?: string[];
}

export type {
  SelectedAssociationMemberData,
  MemberTableProps,
  AssociationMembersListItem,
  AssociationMembersDataSource,
  AssociationMembersData,
};
