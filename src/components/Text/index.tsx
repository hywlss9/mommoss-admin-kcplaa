import colors from '@constants/colors';

import * as S from './styled';
import type * as T from './type';

function Text({
  size = 14,
  weight = 400,
  color = colors.DEFAULT_TEXT,
  block = true,
  underline = false,
  cursor = 'auto',
  style,
  children,
  ...props
}: T.TextProps) {
  return (
    <S.Text
      {...props}
      size={size}
      weight={weight}
      color={color}
      block={block}
      underline={underline}
      cursor={cursor}
      style={style}>
      {children}
    </S.Text>
  );
}

export default Text;
