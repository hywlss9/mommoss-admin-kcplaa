import styled from 'styled-components';

import { Text } from '@components/Text/styled';

export const Container = styled.div`
  > ${Text} {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
`;
