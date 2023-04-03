import type { Dispatch, SetStateAction } from 'react';

import type { Group } from '@type/group';

interface BusinessInfoFormProps {
  info: Group;
  setInfo: Dispatch<SetStateAction<Group | null>>;
}

export type { BusinessInfoFormProps };
