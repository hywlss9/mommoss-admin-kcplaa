import type { User } from '@type/user';

interface Role {
  id: number;
  name: string;
}

interface AccessRole {
  id: number;
  name: string;
}

interface Admin extends User {
  accessRoles: AccessRole[];
}

export type { Role, AccessRole, Admin };
