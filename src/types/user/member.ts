import type { Position } from '@pages/business/Position/List/type';

import type { User } from './user';

interface Affiliation {
  id: number;
  name: string;
  parentId: number | null;
  members: Member[];
}

interface Member extends User {
  affiliation: Pick<Affiliation, 'id' | 'name'> | null;
  position: Position;
}

export type { Affiliation, Member };
