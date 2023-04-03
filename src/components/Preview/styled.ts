import styled from 'styled-components';

import colors from '@constants/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  max-width: 390px;
  > .ant-menu {
    margin-bottom: 24px;
  }
`;

export const SubTitle = styled.strong`
  display: block;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 400;
`;

export const PreviewBox = styled.div<{ isPhone: boolean; backgroundColor?: string }>`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 350px;
  max-height: 650px;
  min-height: 600px;
  border: 5px ${colors.GRAY_BRIGHT_2} solid;
  border-radius: 32px;
  background-color: ${({ backgroundColor }) => backgroundColor || colors.GRAY_LIGHT_3};
  box-shadow: 0 0 4.5px rgba(156, 156, 156, 0.4);
  ${({ isPhone }) =>
    isPhone &&
    `
      > *:last-child {
        max-height: calc(100% - 52px);
      }
    `}
`;

export const PhoneHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 18px 16px 12px;
  background-color: ${colors.WHITE};
`;

export const IconBox = styled.div`
  > svg {
    margin-left: 8px;
  }
`;
