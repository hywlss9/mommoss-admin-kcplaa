import { useState } from 'react';

import * as C from '@components/Common';

import Groups from './Groups';
import Members from './Members';
import * as S from './styled';

function Association() {
  const [associationId, setAssociationId] = useState<number | undefined>();

  return (
    <C.Container>
      <C.Title>회원 그룹 관리</C.Title>
      <S.ContentRow>
        <Groups selectAssociation={setAssociationId} />
        <Members associationId={associationId} />
      </S.ContentRow>
    </C.Container>
  );
}

export default Association;
