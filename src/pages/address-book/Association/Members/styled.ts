import styled from 'styled-components';

import colors from '@constants/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  > .table-content-box {
    flex: 1;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  > .ant-input-search {
    max-width: 328px;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  > svg {
    margin-left: 8px;
    cursor: pointer;
  }
`;

export const ChangePositionList = styled.ul`
  padding: 8px 0;
`;

export const ChangePositionItem = styled.li`
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

export const CreateMemberBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 18px;
  > button {
    min-width: 144px;
    margin-left: 8px;
  }
`;
