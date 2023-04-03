import { ReactComponent as Arrow } from '@assets/icons/arrow-up.svg';

import * as S from './styled';
import type * as T from './type';

function Sort({ title, dir, onClick }: T.SortProps) {
  return (
    <S.Container onClick={onClick}>
      <p>{title}</p>
      <S.ArrowBox>
        {dir === 'desc' ? <Arrow className='arrow-up' /> : <Arrow className='arrow-down' />}
      </S.ArrowBox>
    </S.Container>
  );
}
export default Sort;
