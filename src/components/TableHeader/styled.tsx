import styled from 'styled-components';

import colors from '@constants/colors';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0 12px 16px;
  > .ant-input-search {
    width: 300px;
    margin-left: 16px;
  }
`;

export const HeaderButtonBox = styled.div`
  display: flex;
  align-items: center;
  > button {
    margin-right: 24px;
    padding: 0;
    font-weight: 500;
    color: ${colors.BLUE_ORIGIN_1};
  }
  .ant-divider {
    top: 0;
    height: calc(100% - 16px);
    margin-right: 24px;
    margin-left: 0;
    border-color: ${colors.GRAY_BRIGHT_1};
  }
`;

export const RightButtonBox = styled.div`
  display: flex;
  align-items: center;
  > button {
    margin-left: 24px;
  }
`;
