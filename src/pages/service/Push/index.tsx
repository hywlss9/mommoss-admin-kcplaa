import useNavMenuKey from '@hooks/useNavMenuKey';

import * as C from '@components/Common';
import NavMenu from '@components/NavMenu';

import type { NavMenuItems } from '@type/util';

import SendMessage from './SendPush';
import Situation from './Situation';
import type * as T from './type';

function Push() {
  const navMenuItems: NavMenuItems<T.NavMenuType> = [
    { key: 'write', label: '새 메시지 작성' },
    { key: 'situation', label: '발송 현황' },
  ];

  const navMenuKey = useNavMenuKey<T.NavMenuType>(navMenuItems[0].key);

  return (
    <C.Container>
      <C.Title>알림메시지</C.Title>
      {/* TODO: defaultKey navMenuKey로 */}
      <NavMenu items={navMenuItems} defaultKey='write' />
      {navMenuKey === 'write' && <SendMessage />}
      {navMenuKey === 'situation' && <Situation />}
    </C.Container>
  );
}

export default Push;
