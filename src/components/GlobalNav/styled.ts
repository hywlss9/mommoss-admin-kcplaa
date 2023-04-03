import styled from 'styled-components';

import colors from '@constants/colors';

export const Container = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  width: 214px;
  height: calc(100vh - 56px);
  border-right: 1px solid ${colors.GRAY_LIGHT_1};
  background-color: ${colors.GRAY_LIGHT_1};
`;
