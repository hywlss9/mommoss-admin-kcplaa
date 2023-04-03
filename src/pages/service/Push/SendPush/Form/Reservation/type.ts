import type { Dispatch, SetStateAction } from 'react';

import type { SendPushData } from '@type/push';

type ReservationType = 'now' | 'delay';

interface ReservationProps {
  setPush: Dispatch<SetStateAction<SendPushData>>;
}

export type { ReservationType, ReservationProps };
