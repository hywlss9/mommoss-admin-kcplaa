import styled from 'styled-components';

import colors from '@constants/colors';

export const OrgTtile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  img,
  svg {
    margin-left: 8px;
    cursor: pointer;
    &:last-child {
      margin-right: 8px;
    }
  }
  svg {
    fill: #fff;
    width: 12px;
    height: 12px;
    > path {
      fill: ${colors.GREEN_ORIGIN};
    }
  }
`;

export const NotSelectOrgBox = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;
