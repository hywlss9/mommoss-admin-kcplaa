import type { Dispatch, SetStateAction } from 'react';

import type { CreatePasswordType } from '@components/Modals/CreateMembersModal/type';

interface PasswrodCreateWayProps {
  type: CreatePasswordType;
  setType: Dispatch<SetStateAction<CreatePasswordType>>;
}

export type { PasswrodCreateWayProps };
