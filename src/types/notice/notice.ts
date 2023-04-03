import type { AntdTableDataSource } from '@type/antd-table';
import type { components } from '@type/model';
import type { Get } from '@type/util';

type NoticeCategory = components['schemas']['NoticeCategory$mZFLkyvTelC5g8XnyQrpOw'];

type WriteNoticeData = components['schemas']['CreateNoticeDto'] & {
  files?: Array<File | components['schemas']['File$0KhelIcqssJxKfi0-pQ-Mw']>;
};

type Notice = components['schemas']['Notice$Cbwe92YYn1sQ4w7UU6OECg'];

type NoticeTableDataSource = AntdTableDataSource<Notice>;

type NoticeTableData = Get<AntdTableDataSource<Notice>>;

export type { Notice, WriteNoticeData, NoticeCategory, NoticeTableDataSource, NoticeTableData };
