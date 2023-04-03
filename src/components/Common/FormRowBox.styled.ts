import styled from 'styled-components';

export const FormRowBox = styled.div<{ align?: string }>`
  display: flex;
  align-items: ${({ align }) => align ?? 'center'};
  > *:not(:last-child) {
    flex-grow: 1;
  }
  > *:last-child {
    margin-left: 16px;
  }
`;
