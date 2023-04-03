import styled from 'styled-components';

import colors from '@constants/colors';

export const CategoryButtonBox = styled.div`
  margin-bottom: 24px;
  > button:not(:last-child) {
    margin-right: 8px;
  }
`;

export const SendButtonBox = styled.div`
  padding: 10px 0;
  text-align: right;
  button {
    border: none;
    &.text-submit {
      border: 1px solid ${colors.NAVY_BLUE_ORIGIN};
      background-color: ${colors.WHITE};
      color: ${colors.NAVY_BLUE_ORIGIN};
    }
  }
`;
