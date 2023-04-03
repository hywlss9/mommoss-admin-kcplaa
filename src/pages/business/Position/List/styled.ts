import styled from 'styled-components';

import colors from '@constants/colors';

export const Container = styled.div`
  position: relative;
  padding-top: 32px;
`;

export const Header = styled.div`
  background-color: ${colors.GRAY_LIGHT_1};
`;

export const Body = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
`;

export const Row = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${colors.GRAY_LIGHT_3};
  list-style: none;
`;

export const Index = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  font-size: 14px;
`;

export const Name = styled.div`
  flex-grow: 1;
  margin-right: 8px;
  font-size: 14px;
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  /* flex-basis: 144px; */
  flex-basis: 32px;
  flex-shrink: 0;
  /* padding-right: 24px; */
  padding-right: 12px;
  font-size: 14px;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;

export const DeleteBox = styled(Button)`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border-radius: 5px;
  background-color: ${colors.NAVY_BLUE_SOFT};
`;

export const ArrowButton = styled(Button)`
  width: 24px;
  height: 24px;
  margin-left: 16px;
  background-color: ${colors.WHITE};
  &:disabled > svg > path {
    fill: ${colors.GRAY_BRIGHT_1};
  }
`;

export const Upbutton = styled(ArrowButton)`
  > svg {
    transform: rotateZ(180deg);
  }
`;

export const Downbutton = styled(ArrowButton)``;
