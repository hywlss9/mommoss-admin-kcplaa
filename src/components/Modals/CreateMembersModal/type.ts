import type { MemberDataSource } from './BatchesMember/type';

interface CreateMembersModalProps {}

interface Rows {
  existing: MemberDataSource;
  current: MemberDataSource;
}

type CreatePasswordType = 'auto' | 'manual';

export type { CreateMembersModalProps, Rows, CreatePasswordType };
