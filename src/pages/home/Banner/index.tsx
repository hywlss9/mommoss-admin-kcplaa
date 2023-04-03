import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import useNavMenuKey from '@hooks/useNavMenuKey';

import * as C from '@components/Common';
import NavMenu from '@components/NavMenu';

import type { NavMenuItems } from '@type/util';

import List from './List';
import type * as T from './type';

function Push() {
  const dispatch = useDispatch();

  const navMenuItems: NavMenuItems<T.NavMenuType> = [{ key: 'list', label: '배너 목록' }];

  const navMenuKey = useNavMenuKey<T.NavMenuType>(navMenuItems[0].key);

  const openCreateBannerModal = () => dispatch(openModal({ name: 'createBanner' }));

  return (
    <C.Container>
      <C.Title>배너 관리</C.Title>
      <NavMenu
        items={navMenuItems}
        defaultKey={navMenuKey}
        rightButtons={[{ text: '생성', type: 'primary', onClick: openCreateBannerModal }]}
      />
      {navMenuKey === 'list' && <List />}
    </C.Container>
  );
}

export default Push;
