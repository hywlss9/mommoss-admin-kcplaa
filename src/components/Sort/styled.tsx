import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  cursor: pointer;
`;

export const ArrowBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  svg {
    transition: all ease 0.5s;
  }
  .arrow-down {
    transform: rotate(180deg);
  }
`;
