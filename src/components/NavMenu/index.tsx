import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import useNavMenuKey from '@hooks/useNavMenuKey';

import colors from '@constants/colors';

import MenuRightButtons from '@components/MenuRightButtons';
import Text from '@components/Text';

import * as S from './styled';
import type * as T from './type';

function NavMenu({ items, defaultKey, navUrl, rightButtons }: T.NavMenuProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navMenuKey = useNavMenuKey(defaultKey);

  const handleMenu = ({ key }: any) => {
    navigate(`${navUrl || location.pathname}?menu=${key}`);
  };

  return (
    <Menu mode='horizontal' selectedKeys={[navMenuKey]} onSelect={handleMenu}>
      {items.map(({ key, label, badge }) => {
        const isBadge = typeof badge !== 'undefined';
        const isSelected = navMenuKey === key;

        return (
          <Menu.Item key={key}>
            <S.MenuContent isSelected={isSelected}>
              <S.Label>{label}</S.Label>
              {isBadge && (
                <Text size={10} block={false} color={colors.NAVY_BLUE_ORIGIN}>
                  {badge}
                </Text>
              )}
            </S.MenuContent>
          </Menu.Item>
        );
      })}
      {rightButtons && <MenuRightButtons buttons={rightButtons} />}
    </Menu>
  );
}

export default NavMenu;
