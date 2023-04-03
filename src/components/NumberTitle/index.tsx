import * as S from './styled';
import type * as T from './type';

function NumberTitle({ number, title }: T.NumberTitleProps) {
  return (
    <S.Container>
      <S.Number>{number}</S.Number>
      {title}
    </S.Container>
  );
}

export default NumberTitle;
