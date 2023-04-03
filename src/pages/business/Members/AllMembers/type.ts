import type { Dispatch, SetStateAction } from 'react';

import type { GetGroupMembersResponse } from '@api/group/getGroupMembers';

import type { AntdTableDataSource } from '@type/antd-table';
import type { Get } from '@type/util';

type MembersItem = Get<GetGroupMembersResponse['rows']>;

type MemberTableDataSource = AntdTableDataSource<MembersItem>;

type MemberTableData = Get<MemberTableDataSource>;

interface SelectedMemberData {
  selectedMembers?: MemberTableData[];
  setSelectedMembers?: Dispatch<SetStateAction<MemberTableData[]>>;
}

interface MemberTableProps extends SelectedMemberData {
  pageSize?: number;
  header?: boolean;
  search?: boolean;
  tags?: 'top' | 'bottom';
  blackList?: string[];
}

export type { MemberTableData, MemberTableDataSource, SelectedMemberData, MemberTableProps };
