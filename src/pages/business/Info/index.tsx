import useNavMenuKey from '@hooks/useNavMenuKey';

import * as C from '@components/Common';
import NavMenu from '@components/NavMenu';

import type { NavMenuItems } from '@type/util';

import BasicInfo from './BasicInfo';
import type * as T from './type';

function Push() {
  const navMenuItems: NavMenuItems<T.NavMenuType> = [{ key: 'info', label: '기본정보' }];

  const navMenuKey = useNavMenuKey<T.NavMenuType>(navMenuItems[0].key);

  return (
    <C.Container>
      <C.Title>사업장 정보</C.Title>
      <NavMenu items={navMenuItems} defaultKey='info' />
      {navMenuKey === 'info' && <BasicInfo />}
    </C.Container>
  );
}

export default Push;
