import styled from 'styled-components';

export const FormRowBox = styled.div`
  display: flex;
  align-items: center;
  > *:not(:last-child) {
    flex-grow: 1;
  }
  > button {
    margin-left: 16px;
  }
`;
