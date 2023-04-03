import styled from 'styled-components';

export const BtnBox = styled.div`
  display: flex;
  > button {
    height: auto;
    padding: 0;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    flex-grow: 0;
    width: 16px;
    height: 16px;
    margin-left: 16px;
    padding: 2px;
  }
`;
