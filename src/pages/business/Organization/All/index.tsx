import { useEffect, useState } from 'react';

import { off, on } from '@utils/globalEvents';

import Table from './Table';
import Tree from './Tree';
import * as S from './styled';

function All() {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<number | undefined>();

  const resetSelectedOrgId = () => setSelectedOrganizationId(undefined);

  useEffect(() => {
    on('SUCCESS_DELETE_ORGANIZATION', resetSelectedOrgId);
    return () => {
      off('SUCCESS_DELETE_ORGANIZATION', resetSelectedOrgId);
    };
  }, []);

  return (
    <S.Container>
      <Tree setSelectedOrganizationId={setSelectedOrganizationId} />
      <Table selectedOrganizationId={selectedOrganizationId} />
    </S.Container>
  );
}

export default All;
