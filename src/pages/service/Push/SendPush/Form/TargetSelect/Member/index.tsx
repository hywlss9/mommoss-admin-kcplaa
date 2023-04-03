import AssociationMemberTable from '@pages/address-book/AssociationMembers/Table';
import type { SelectedAssociationMemberData } from '@pages/address-book/AssociationMembers/Table/type';

const blackList: string[] = ['position', 'email'];

function Member({ selectedMembers, setSelectedMembers }: SelectedAssociationMemberData) {
  return (
    <AssociationMemberTable
      selectedMembers={selectedMembers}
      setSelectedMembers={setSelectedMembers}
      pageSize={6}
      search={true}
      tags='top'
      header={false}
      blackList={blackList}
    />
  );
}

export default Member;
