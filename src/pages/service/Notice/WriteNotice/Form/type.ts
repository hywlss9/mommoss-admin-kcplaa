import type { Dispatch, SetStateAction } from 'react';

import type { WriteNoticeData } from '@type/notice';

interface WriteNoticeFormProps {
  notice?: WriteNoticeData;
  setNotice?: Dispatch<SetStateAction<WriteNoticeData | undefined>>;
  isSubmitButton?: boolean;
}

export type { WriteNoticeFormProps };
