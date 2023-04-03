import styled from 'styled-components';

import colors from '@constants/colors';

export const CertifiedBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  margin-right: 4px;
  padding-top: 2px;
  padding-left: 1px;
  border-radius: 50%;
  background-color: ${colors.BLUE_ORIGIN_1};
  &::before {
    display: block;
    content: '✓';
    color: ${colors.WHITE};
  }
`;
