import type { GetBannersResponse } from '@api/banner/getBanners';

import type { AntdTableDataSource } from '@type/antd-table';
import type { Get } from '@type/util';

type Banner = Get<GetBannersResponse['rows']>;

type BannerTableDataSource = AntdTableDataSource<Banner>;

type BannerTableData = Get<BannerTableDataSource>;

export type { Banner, BannerTableDataSource, BannerTableData };
