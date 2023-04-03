import styled from 'styled-components';

import colors from '@constants/colors';

export const NoticeBox = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${colors.GRAY_LIGHT_3};
`;

export const NoticeHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const NoticeTitle = styled.strong`
  flex-grow: 1;
`;

export const NoticeDate = styled.p`
  flex-grow: 0;
  font-size: 10px;
  color: ${colors.GRAY_ORIGIN_1};
`;

export const NoticeText = styled.pre`
  display: -webkit-box;
  overflow: hidden;
  margin-bottom: 0;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
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
`;
