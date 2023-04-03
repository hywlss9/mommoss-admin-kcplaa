import type { NoticeCategory } from '@type/notice';

interface MessageTypeProps {
  setCategory: (category: NoticeCategory) => void;
  categoryId?: NoticeCategory['id'];
}

export type { MessageTypeProps };
