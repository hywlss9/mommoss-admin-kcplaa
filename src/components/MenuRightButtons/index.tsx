import { Button } from 'antd';

import * as S from './styled';
import type * as T from './type';

function MenuRightButtons({ buttons }: T.MenuRightButtonsProps) {
  return (
    <S.Container>
      {buttons.map((props, index) => (
        <Button key={index} {...props}>
          {props.text}
        </Button>
      ))}
    </S.Container>
  );
}

export default MenuRightButtons;
