import type { Dispatch, SetStateAction } from 'react';

import type { SendPushData } from '@type/push';

interface SendMessageFormProps {
  push?: Partial<SendPushData>;
  setPush?: Dispatch<SetStateAction<SendPushData>>;
}

interface Target {
  id: number;
  title: string;
}

export type { SendMessageFormProps, Target };
