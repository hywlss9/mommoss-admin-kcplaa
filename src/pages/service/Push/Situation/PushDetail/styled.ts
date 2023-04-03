import styled from 'styled-components';

import colors from '@constants/colors';

export const SendInfoBox = styled.div`
  min-width: 272px;
  padding: 0 16px;
  background-color: ${colors.WHITE};
`;

export const SendInfoTitle = styled.p`
  padding: 13.5px 0;
  font-weight: 700;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 9.5px 8px;
  > p {
    width: 50%;
  }
`;

export const ItemTitle = styled.p``;

export const ItemValue = styled.p<{ color?: string }>`
  font-weight: 500;
  color: ${({ color }) => color || colors.DEFAULT_TEXT};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
  > span {
    width: 50%;
  }
`;

export const FailRowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const UnderLineText = styled.span`
  text-decoration: underline;
`;
