import { Menu } from 'antd';
import dayjs from 'dayjs';

import colors from '@constants/colors';

import Text from '@components/Text';

import { ReactComponent as Battery } from '@assets/icons/battery.svg';
import { ReactComponent as Spread } from '@assets/icons/spread.svg';
import { ReactComponent as Wifi } from '@assets/icons/wifi.svg';

import * as S from './styled';
import type * as T from './type';

function Preview({ children, backgroundColor, menu, notPhone }: T.PreviewProps) {
  return (
    <S.Container>
      <S.SubTitle>미리보기</S.SubTitle>
      {typeof menu !== 'undefined' && (
        <Menu mode='horizontal' selectedKeys={[menu.selectedKey]} onSelect={menu.onSelect}>
          {menu.items.map(({ key, label }) => (
            <Menu.Item key={key}>{label}</Menu.Item>
          ))}
        </Menu>
      )}
      <S.PreviewBox isPhone={!notPhone} backgroundColor={backgroundColor}>
        {notPhone ? (
          <>{children}</>
        ) : (
          <>
            <S.PhoneHeader>
              <Text color={colors.GRAY_LIGHT_3}>{dayjs(new Date()).format('HH:mm')}</Text>
              <S.IconBox>
                <Spread />
                <Wifi />
                <Battery />
              </S.IconBox>
            </S.PhoneHeader>
            {children}
          </>
        )}
      </S.PreviewBox>
    </S.Container>
  );
}

export default Preview;
