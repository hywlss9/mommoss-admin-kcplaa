import styled from 'styled-components';

import colors from '@constants/colors';

import Logo from '@assets/images/flat-logo.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 32px 16px 0;
  background-image: url(${Logo});
  background-size: 206px 217px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  > * {
    margin-bottom: 16px;
  }
`;

export const ProfileImgBox = styled.div`
  overflow: hidden;
  height: 104px;
  max-width: 96px;
  border: 1px solid ${colors.GRAY_BRIGHT_3};
  border-radius: 5px;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
