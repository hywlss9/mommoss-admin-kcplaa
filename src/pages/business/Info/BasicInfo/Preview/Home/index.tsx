import Kcplaa from '@assets/icons/kcplaa.png';

import * as S from './styled';
import type * as T from './type';

function Home({ info }: T.PreviewHomeProps) {
  return (
    <S.Container>
      <S.BusinessNameBox>
        <img src={Kcplaa} alt='한국노무사회로고' className='preview-logo' />
        {info.name}
      </S.BusinessNameBox>
    </S.Container>
  );
}

export default Home;
