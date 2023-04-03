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

export const CreateMemberBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  > button {
    min-width: 144px;
    margin-left: 8px;
  }
`;
