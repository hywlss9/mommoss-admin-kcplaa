import styled from 'styled-components';

import colors from '@constants/colors';

export const FileUplaodBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 24px 0;
  border-radius: 5px;
  background-color: ${colors.GRAY_LIGHT_2};
  > *:not(:last-child) {
    margin-bottom: 16px;
  }
  > button {
    padding: 0 64px;
  }
  > input {
    display: none !important;
    visibility: hidden;
    opacity: 0;
    margin: 0;
  }
`;

export const FileUploadButtonBox = styled.div`
  display: inline-block;
  > input {
    display: none !important;
    visibility: hidden;
    opacity: 0;
    margin: 0;
  }
`;
