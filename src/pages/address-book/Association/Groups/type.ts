import type { Dispatch, SetStateAction } from 'react';

interface AssociationListProps {
  selectAssociation: Dispatch<SetStateAction<number | undefined>>;
}

export type { AssociationListProps };
