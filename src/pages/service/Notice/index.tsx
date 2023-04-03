import useNavMenuKey from '@hooks/useNavMenuKey';

import * as C from '@components/Common';
import NavMenu from '@components/NavMenu';

import type { NavMenuItems } from '@type/util';

import Table from './Table';
import WriteNotice from './WriteNotice';
import type * as T from './type';

function Notice() {
  const navMenuItems: NavMenuItems<T.NavMenuType> = [
    { key: 'write', label: '공지 작성' },
    { key: 'list', label: '공지 목록' },
  ];

  const navMenuKey = useNavMenuKey<T.NavMenuType>(navMenuItems[0].key);

  return (
    <C.Container>
      <C.Title>공지 관리</C.Title>
      <NavMenu items={navMenuItems} defaultKey='write' />
      {navMenuKey === 'write' && <WriteNotice />}
      {navMenuKey === 'list' && <Table />}
    </C.Container>
  );
}

export default Notice;
