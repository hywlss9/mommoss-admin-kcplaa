import type { WriteNoticeData } from '@type/notice';

type PreviewMenu = 'list' | 'view';

type PreviewNoticeMenu = 'all' | 'unread';

interface WriteNoticePreviewProps {
  notice: WriteNoticeData | undefined;
}

export type { PreviewMenu, PreviewNoticeMenu, WriteNoticePreviewProps };
