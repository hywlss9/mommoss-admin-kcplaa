import type { GetPushesResponse } from '@api/push/getPushes';

import type { AntdTableDataSource } from '@type/antd-table';
import type { Get } from '@type/util';

type SendContentType = 'push' | 'pobox' | 'mail';

type GetPushesResponseItem = Get<GetPushesResponse['rows']>;

type PushSituationTableDataSource = AntdTableDataSource<GetPushesResponseItem>;

type PushSituationTableData = Get<PushSituationTableDataSource>;

export type {
  SendContentType,
  GetPushesResponseItem,
  PushSituationTableDataSource,
  PushSituationTableData,
};
