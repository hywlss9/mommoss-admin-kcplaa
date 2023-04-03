import AssociationMemberTable from '@pages/address-book/AssociationMembers/Table';
import type { SelectedAssociationMemberData } from '@pages/address-book/AssociationMembers/Table/type';

const blackList: string[] = [
  'licenseCb',
  'callNumber',
  'receive',
  'useMommoss',
  'lastActivatedAt',
  'position',
];

function Member({ selectedMembers, setSelectedMembers }: SelectedAssociationMemberData) {
  return (
    <AssociationMemberTable
      selectedMembers={selectedMembers}
      setSelectedMembers={setSelectedMembers}
      pageSize={6}
      search={true}
      isSelect={true}
      tags='top'
      header={false}
      blackList={blackList}
    />
  );
}

export default Member;
