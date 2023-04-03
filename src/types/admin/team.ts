import type { User } from '@type/user';

interface Team {
  name: string;
  id: string;
  profileImg: string | null;
  creator: User;
}

export type { Team };
