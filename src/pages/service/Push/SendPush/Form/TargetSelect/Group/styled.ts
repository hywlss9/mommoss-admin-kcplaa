import styled from 'styled-components';

import colors from '@constants/colors';

export const SelectBox = styled.div`
  width: 300px;
  .ant-select {
    margin-bottom: 16px;
  }
`;

export const SelectedList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 105px;
`;

export const SelectedItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px 8px 0;
  > svg {
    cursor: pointer;
  }
`;

export const SelectedTag = styled.div`
  display: inline-block;
  border-radius: 50vh;
  background-color: ${colors.GRAY_LIGHT_3};
  margin-right: 4px;
  padding: 2px 4px;
  font-size: 12px;
  > span {
    margin-left: 4px;
  }
`;
