import type { Member } from '@type/user';

interface CreateMemberModalProps {}

interface SelectOption {
  label: string;
  value: number | string;
}

type MemberInfo = Pick<Member, 'name' | 'affiliation' | 'position' | 'email'> & {
  id: Member['account']['id'];
  password: string;
};

export type { SelectOption, CreateMemberModalProps, MemberInfo };
