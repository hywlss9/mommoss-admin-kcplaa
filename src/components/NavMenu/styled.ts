import styled from 'styled-components';

import colors from '@constants/colors';

import { Text } from '@components/Text/styled';

export const Label = styled.p`
  position: relative;
  &::after {
    display: none;
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    border-bottom: 3px solid ${colors.NAVY_BLUE_ORIGIN};
  }
`;

export const MenuContent = styled.div<{ isSelected: boolean }>`
  display: flex;
  ${Text} {
    margin-top: -1px;
    margin-left: 2px;
  }
  ${({ isSelected }) =>
    isSelected
      ? `
    ${Label}::after {
      display: block;
    }
  `
      : `
    ${Text} {
      color: ${colors.GRAY_BRIGHT_1};
    }
  `}
`;
