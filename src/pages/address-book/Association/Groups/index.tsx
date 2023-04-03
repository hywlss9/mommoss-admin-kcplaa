import { Button } from 'antd';
import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import AssociationGroupTable from './Table';
import * as S from './styled';
import type * as T from './type';

function Groups({ selectAssociation }: T.AssociationListProps) {
  const dispatch = useDispatch();

  const openCreateAssociationModal = () => dispatch(openModal({ name: 'createAssociation' }));

  return (
    <S.Container>
      <AssociationGroupTable selectAssociationId={selectAssociation} />
      <Button type='primary' onClick={openCreateAssociationModal}>
        그룹 추가
      </Button>
    </S.Container>
  );
}

export default Groups;
