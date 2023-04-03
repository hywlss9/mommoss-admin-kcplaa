import styled from 'styled-components';

import colors from '@constants/colors';

export const SendInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RowBox = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Message = styled.span`
  text-decoration: underline;
`;

export const UnderLineText = styled.span`
  text-decoration: underline;
`;

export const SendResultText = styled.p`
  display: flex;
  > ${UnderLineText} {
    margin-right: 4px;
  }
`;

export const FailText = styled.span`
  color: ${colors.RED_ORIGIN};
`;
