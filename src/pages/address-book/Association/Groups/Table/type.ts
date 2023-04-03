import type { Dispatch, SetStateAction } from 'react';

import type { AssociationTableData } from '@type/group';

interface AssociationGroupTableProps {
  selectAssociationId: Dispatch<SetStateAction<number | undefined>>;
  isMoveSelection?: boolean;
  moveGroupSelect?: (data: AssociationTableData, selected: boolean) => void;
}

export type { AssociationGroupTableProps };
