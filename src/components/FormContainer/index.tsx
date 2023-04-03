import type { HTMLAttributes } from 'react';

import * as S from './styled';

function FormContainer(props: HTMLAttributes<HTMLDivElement>) {
  return <S.FormContainer {...props}>{props.children}</S.FormContainer>;
}

export default FormContainer;
