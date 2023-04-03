import type { GetPushesResponseItem } from '@pages/service/Push/Situation/type';

import type { AntdTableDataSource } from '@type/antd-table';
import type { PushResult } from '@type/push';

interface FailedPushListModalProps {
  pushDetail: GetPushesResponseItem;
}

type FailedPushListDataSource = AntdTableDataSource<PushResult>;

export type { FailedPushListModalProps, FailedPushListDataSource };
