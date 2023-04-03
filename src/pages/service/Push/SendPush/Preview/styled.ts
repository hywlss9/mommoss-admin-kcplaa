import styled from 'styled-components';

import colors from '@constants/colors';

export const PushContainer = styled.div`
  width: calc(100% - 40px);
  min-height: 40px;
  margin: 20px;
  padding: 8px;
  border-radius: 10px;
  background-color: ${colors.WHITE};
`;

export const PushDetailBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 12px;
`;

export const PushDetailTitleBox = styled.div`
  display: flex;
  align-items: center;
  > .preview-logo {
    margin-right: 2px;
  }
`;

export const Title = styled.strong`
  display: block;
  margin-bottom: 4px;
  font-weight: 700;
`;

export const Content = styled.pre`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;
