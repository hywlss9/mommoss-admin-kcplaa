import styled from 'styled-components';

import colors from '@constants/colors';

import { Text } from '@components/Text/styled';

export const Container = styled.div`
  flex-shrink: 0;
  min-width: 328px;
  padding-top: 12px;
  > .ant-input-search {
    margin-bottom: 20px;
  }
`;

export const OrganizationBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  border: 1px solid ${colors.GRAY_LIGHT_5};
  border-radius: 5px;
`;

export const TreeBox = styled.div<{ height?: number }>`
  overflow: auto;
  height: ${({ height }) => (height ? `${height}px` : '400px')};
`;

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

export const Footer = styled.div`
  > ${Text} {
    margin-left: 16px;
  }
`;

export const FooterButtonBox = styled.div`
  width: calc(100% - 20px);
  margin: 0 auto;
  margin-top: 24px;
  padding: 18px 6px;
  border-top: 1px solid ${colors.GRAY_LIGHT_5};
  text-align: right;
`;
