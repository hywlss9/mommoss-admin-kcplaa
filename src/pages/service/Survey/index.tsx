import useNavMenuKey from '@hooks/useNavMenuKey';

import * as C from '@components/Common';
import NavMenu from '@components/NavMenu';

import type { NavMenuItems } from '@type/util';

import Table from './Table';
import WriteSurvey from './WriteSurvey';
import type * as T from './type';

function Survey() {
  const navMenuItems: NavMenuItems<T.NavMenuType> = [
    { key: 'write', label: '새 설문 작성' },
    { key: 'list', label: '설문 목록' },
  ];

  const navMenuKey = useNavMenuKey<T.NavMenuType>(navMenuItems[0].key);

  return (
    <C.Container>
      <C.Title>설문</C.Title>
      <NavMenu items={navMenuItems} defaultKey='write' />
      {navMenuKey === 'write' && <WriteSurvey />}
      {navMenuKey === 'list' && <Table />}
    </C.Container>
  );
}

export default Survey;
