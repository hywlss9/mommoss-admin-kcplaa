import { useState } from 'react';

import { Switch } from 'antd';

import * as C from '@components/Common';
import Text from '@components/Text';

import List from './List';
import * as S from './styled';

function Position() {
  const [hasPosition, setHasPosition] = useState<boolean>(true);

  const handleHasPosition = (checked: boolean) => setHasPosition(checked);

  return (
    <C.Container>
      <C.Title>직위</C.Title>
      {/* <S.SwitchBox>
        <Text size={12}>직위 사용하기</Text>
        <Switch checked={hasPosition} onChange={handleHasPosition} />
      </S.SwitchBox> */}
      {hasPosition && <List />}
    </C.Container>
  );
}

export default Position;
