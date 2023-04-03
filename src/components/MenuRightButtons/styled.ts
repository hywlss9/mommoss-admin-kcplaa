import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  position: absolute;
  top: 50%;
  right: 0;
  height: 100%;
  transform: translateY(-50%);
  > button {
    margin-left: 16px;
  }
`;
