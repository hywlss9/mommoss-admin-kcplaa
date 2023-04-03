import styled from 'styled-components';

import colors from '@constants/colors';

export const Container = styled.strong`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 500;
`;

export const Number = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-right: 14px;
  font-size: 14px;
  font-weight: 400;
  border-radius: 50%;
  background-color: ${colors.NAVY_BLUE_SOFT};
`;
