import type { HTMLAttributes } from 'react';

import type { CSSProperties } from 'styled-components';

interface TextStyleProps {
  size?: number;
  weight?: number;
  color?: string;
  block?: boolean;
  underline?: boolean;
  cursor?: string;
  style?: CSSProperties;
}

interface TextProps extends TextStyleProps, HTMLAttributes<HTMLElement> {}

export type { TextStyleProps, TextProps };
