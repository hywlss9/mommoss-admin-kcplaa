import type { Dispatch, SetStateAction } from 'react';

import type { CreatePasswordType, Rows } from '@components/Modals/CreateMembersModal/type';

import type { AntdTableDataSource } from '@type/antd-table';

interface BatchesMemberProps {
  isUpload: boolean;
  createPasswordType: CreatePasswordType;
  rows: Rows;
  setRows: Dispatch<SetStateAction<Rows>>;
  selectedMemberKeys: number[];
  setSelectedMemberKeys: Dispatch<SetStateAction<number[]>>;
}

interface MemberData {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  organization?: string;
  position?: string;
  role?: string;
}

type MemberDataSource = AntdTableDataSource<MemberData>;

interface SelectOption {
  label: string;
  value: number | string;
}

export type { BatchesMemberProps, MemberData, MemberDataSource, SelectOption };
