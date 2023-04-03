import styled from 'styled-components';

import colors from '@constants/colors';

export const FileListBox = styled.div``;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 4px 12px;
  border: 1px solid ${colors.NAVY_BLUE_ORIGIN};
  border-radius: 50vh;
  > span {
    flex-grow: 1;
    overflow: hidden;
    max-width: calc(100% - 16px);
    padding-right: 8px;
    text-overflow: ellipsis;
    white-space: pre;
  }
  > svg {
    cursor: pointer;
  }
`;
