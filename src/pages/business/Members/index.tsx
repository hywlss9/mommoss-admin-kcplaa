import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import useNavMenuKey from '@hooks/useNavMenuKey';

import * as C from '@components/Common';
import type { MenuRightButton } from '@components/MenuRightButtons/type';
import NavMenu from '@components/NavMenu';

import type { NavMenuItems } from '@type/util';

import AllMembers from './AllMembers';
import type * as T from './type';

function MemberManagement() {
  const dispatch = useDispatch();

  const navMenuItems: NavMenuItems<T.NavMenuType> = [{ key: 'all', label: '전체구성원' }];

  const navMenuKey = useNavMenuKey<T.NavMenuType>(navMenuItems[0].key);

  const openCreateMemberModal = () => dispatch(openModal({ name: 'createMember' }));

  const openCreateMembersModal = () => dispatch(openModal({ name: 'createMembers' }));

  const navMenuRightButtons: MenuRightButton[] = [
    //TODO: 구성원 일괄 추가 완성해야함
    {
      type: 'default',
      text: '구성원 일괄 추가',
      onClick: openCreateMembersModal,
    },
    {
      type: 'primary',
      text: '구성원 추가',
      onClick: openCreateMemberModal,
    },
  ];

  return (
    <C.Container>
      <C.Title>구성원</C.Title>
      <NavMenu items={navMenuItems} defaultKey='all' rightButtons={navMenuRightButtons} />
      {navMenuKey === 'all' && <AllMembers tags='bottom' />}
    </C.Container>
  );
}

export default MemberManagement;
