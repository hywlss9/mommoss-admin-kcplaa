import type { TablePaginationConfig } from 'antd/es/table';

import type { GetVideosResponse } from '@api/videos/getVideos';

import type { AntdTableDataSource } from '@type/antd-table';
import type { Get } from '@type/util';

type GetVideosResponseItem = Get<GetVideosResponse['rows']>;

type VideoTableDataSource = AntdTableDataSource<GetVideosResponseItem>;

type VideoTableData = Get<VideoTableDataSource>;

interface MenuItem {
  key: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
}

export type { VideoTableDataSource, VideoTableData, MenuItem, TableParams };
