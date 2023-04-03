import * as C from '@components/Common';

import MemberTable from './Table';

function AssociationMembers() {
  return (
    <C.Container>
      <C.Title>회원 관리</C.Title>
      <MemberTable header={true} tags='bottom' />
    </C.Container>
  );
}

export default AssociationMembers;
