import styled from 'styled-components';

import colors from '@constants/colors';

export const Container = styled.div`
  position: relative;
`;

export const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${colors.GRAY_BRIGHT_1};
`;

export const Title = styled.p`
  margin-bottom: 20px;
  > span {
    color: ${colors.NAVY_BLUE_ORIGIN};
  }
`;

export const SenderInfoBox = styled.div`
  display: flex;
`;

export const ProfileImageBox = styled.div`
  display: flex;
  margin-right: 16px;
`;

export const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 41%;
  background-color: ${colors.NAVY_BLUE_LIGHT};
`;

export const Date = styled.p`
  font-size: 12px;
  color: ${colors.GRAY_BRIGHT_1};
`;

export const Sender = styled.p``;

export const SendInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    display: flex;
    flex-grow: 1;
    align-items: center;
  }
`;

export const Content = styled.div`
  padding: 16px;
`;

export const FileBox = styled.div`
  padding: 16px 16px 0;
`;

export const FileBtnBox = styled.div`
  display: flex;
  align-items: center;
  > strong {
    display: flex;
    align-items: center;
    > svg {
      margin-right: 8px;
      transform: rotateZ(180deg);
      &.isShow {
        transform: rotateZ(0);
      }
    }
  }
  > span {
    margin-left: 8px;
  }
`;

export const FileItem = styled.div`
  overflow: hidden;
  width: fit-content;
  max-width: 100%;
  margin-top: 8px;
  padding: 4px 8px;
  border: 1px solid ${colors.NAVY_BLUE_ORIGIN};
  border-radius: 50vh;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: pre;
`;
