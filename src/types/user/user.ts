interface Account {
  id: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  account: Account;
  profileImg?: string | null;
}

export type { Account, User };
