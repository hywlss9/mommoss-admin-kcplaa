import type { GetFamiyEventsResponse } from '@api/event/getFamilyEvents';

import type { AntdTableDataSource } from '@type/antd-table';
import type { Get } from '@type/util';

type GetFamilyEventsResponseItem = Get<GetFamiyEventsResponse['rows']>;

type FamilyEventTableDataSource = AntdTableDataSource<GetFamilyEventsResponseItem>;

type FamilyEventTableData = Get<FamilyEventTableDataSource>;

export type { FamilyEventTableDataSource, FamilyEventTableData };
