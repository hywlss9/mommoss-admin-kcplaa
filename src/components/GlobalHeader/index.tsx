import { Button } from 'antd';
import { Link } from 'react-router-dom';

import logout from '@utils/logout';

import Logo from '@assets/images/logo.png';

import * as S from './styled';

function GlobalHeader() {
  return (
    <S.Container className='global'>
      <Link to='/'>
        <img src={Logo} alt='한국노무사회 로고' />
      </Link>
      <S.FloatRightBox>
        <Button onClick={logout}>로그아웃</Button>
      </S.FloatRightBox>
    </S.Container>
  );
}

export default GlobalHeader;
