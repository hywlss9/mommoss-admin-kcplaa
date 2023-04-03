import type { SelectedAssociationMemberData } from '@pages/address-book/AssociationMembers/Table/type';

import type { GroupProps } from './Group/type';

type TargetType = 'all' | 'group' | 'member';

interface MemberProps extends SelectedAssociationMemberData {}

interface TargetSelectProps {
  member: MemberProps;
  group: GroupProps;
}

export type { TargetType, MemberProps, TargetSelectProps };
