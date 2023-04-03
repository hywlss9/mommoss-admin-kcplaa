import { useEffect } from 'react';

import dayjs from 'dayjs';
import JsBarcode from 'jsbarcode';

import Text from '@components/Text';

import Kcplaa from '@assets/icons/kcplaa.png';
import IdentityProfile from '@assets/images/identity-profile.png';

import * as S from './styled';
import type * as T from './type';

function Identity({ info }: T.IdentityPreivewProps) {
  useEffect(() => {
    JsBarcode('#identity-barcode', `60601234567`, {
      width: 1.5,
      height: 29,
      background: 'rgba(0,0,0,0)',
    });
  }, []);

  return (
    <S.Container>
      <S.ProfileImgBox>
        <img src={IdentityProfile} alt='신분증 사진' />
      </S.ProfileImgBox>
      <Text size={16} weight={700}>
        홍길동
      </Text>
      <img id='identity-barcode' />
      <Text size={14} weight={500}>
        위와 같이 증명함.
      </Text>
      <Text size={14} weight={500}>
        {dayjs(new Date()).format('YYYY년 MM월 DD일')}
      </Text>
      <Text size={16} weight={700}>
        <img src={Kcplaa} alt='한국노무사회로고' />
        한국공인노무사회 회장
      </Text>
    </S.Container>
  );
}

export default Identity;
