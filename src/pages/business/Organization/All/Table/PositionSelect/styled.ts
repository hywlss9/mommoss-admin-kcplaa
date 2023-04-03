import styled from 'styled-components';

import colors from '@constants/colors';

import { Text } from '@components/Text/styled';

export const ChangePositionList = styled.ul`
  max-height: 250px;
  padding: 8px 0;
`;

export const ChangePositionItem = styled.li`
  bottom: 0;
  min-width: 120px;
  padding: 8px 16px;
  font-size: 14px;
  list-style: none;
  cursor: pointer;
  &:not(:last-child):hover {
    background-color: ${colors.NAVY_BLUE_SOFT};
  }
`;

export const Divider = styled.li`
  width: 100%;
  margin-bottom: 8px;
  border-top: 1px solid ${colors.GRAY_LIGHT_5};
  list-style: none;
`;

export const CreatePositionBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  > ${Text} {
    padding: 8px 0;
    line-height: 17px;
    word-break: keep-all;
    color: ${colors.GRAY_ORIGIN_1};
  }
  > a {
    padding: 8px 0;
    text-decoration: underline;
    color: ${colors.DEFAULT_TEXT};
  }
`;
