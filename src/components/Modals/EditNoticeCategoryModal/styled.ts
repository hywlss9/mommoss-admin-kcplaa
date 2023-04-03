import styled from 'styled-components';

import colors from '@constants/colors';

export const RowBox = styled.div`
  display: flex;
  > *:first-child {
    flex-grow: 1;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin-left: 16px;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    > svg > path {
      fill: ${colors.BLACK};
    }
  }
`;
