import styled from 'styled-components';

import colors from '@constants/colors';

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  padding: 24px 16px;
  border: 1px solid ${colors.GRAY_LIGHT_5};
  border-radius: 5px;
  > *:not(:last-child) {
    margin-bottom: 16px;
  }
  > .ant-radio-group {
    padding: 0 4px;
  }
`;

export const LinkBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > * {
    margin: 0 8px;
    text-decoration: underline;
    cursor: pointer;
  }
`;
