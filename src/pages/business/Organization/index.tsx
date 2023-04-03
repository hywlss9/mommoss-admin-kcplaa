import useNavMenuKey from '@hooks/useNavMenuKey';

import * as C from '@components/Common';
import NavMenu from '@components/NavMenu';

import type { NavMenuItems } from '@type/util';

import All from './All';
import type * as T from './type';

function Organization() {
  const navMenuItems: NavMenuItems<T.NavMenuType> = [{ key: 'all', label: '전체구성원' }];

  const navMenuKey = useNavMenuKey<T.NavMenuType>(navMenuItems[0].key);

  return (
    <C.Container>
      <C.Title>조직도</C.Title>
      <NavMenu items={navMenuItems} defaultKey='all' />
      {navMenuKey === 'all' && <All />}
    </C.Container>
  );
}

export default Organization;
