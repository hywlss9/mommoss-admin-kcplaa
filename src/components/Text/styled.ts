import styled from 'styled-components';

import type { TextStyleProps } from './type';

export const Text = styled.span<TextStyleProps>`
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${({ weight }) => weight};
  ${({ underline }) => underline && 'text-decoration: underline;'};
  color: ${({ color }) => color};
  cursor: ${({ cursor }) => cursor};
  ${({ style }) => ({ ...style })};
`;
