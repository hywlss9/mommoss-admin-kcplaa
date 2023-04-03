import useNavMenuKey from '@hooks/useNavMenuKey';

import * as C from '@components/Common';
import NavMenu from '@components/NavMenu';

import type { NavMenuItems } from '@type/util';

import Table from './Table';
import type * as T from './type';

function FamilyEvent() {
  const navMenuItems: NavMenuItems<T.NavMenuType> = [{ key: 'list', label: '경조사 목록' }];

  const navMenuKey = useNavMenuKey<T.NavMenuType>(navMenuItems[0].key);

  return (
    <C.Container>
      <C.Title>경조사관리</C.Title>
      <NavMenu items={navMenuItems} defaultKey='list' />
      {navMenuKey === 'list' && <Table />}
    </C.Container>
  );
}

export default FamilyEvent;
