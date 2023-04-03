import type { Dispatch, SetStateAction } from 'react';

import type { Target } from '@pages/service/Push/SendPush/Form/type';

interface GroupProps {
  selectedGroups?: Target[];
  setSelectedGroups?: Dispatch<SetStateAction<Target[]>>;
}

export type { GroupProps };
