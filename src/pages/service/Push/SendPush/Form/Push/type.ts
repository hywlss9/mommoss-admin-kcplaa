import type { Dispatch, SetStateAction } from 'react';

import type { SendPushData } from '@type/push';

type PushType = 'notice' | 'survey' | 'link';

interface PushProps {
  setPush: Dispatch<SetStateAction<SendPushData>>;
}

export type { PushType, PushProps };
