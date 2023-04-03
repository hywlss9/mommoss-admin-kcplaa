import type { ModalProps } from 'antd';

import type { Target } from '@pages/service/Push/SendPush/Form/type';

import type { AntdTableDataSource } from '@type/antd-table';
import type { MemberData } from '@type/group';
import type { SendPushData } from '@type/push';
import type { Get } from '@type/util';

type TestMemberTableDataArr = AntdTableDataSource<MemberData>;
type TestMemberTableData = Get<TestMemberTableDataArr>;

interface PushTestSendModalProps extends ModalProps {
  push: SendPushData;
  selectedGroups: Target;
  selectedMembers: TestMemberTableDataArr;
}

export type { PushTestSendModalProps, TestMemberTableData, TestMemberTableDataArr };
