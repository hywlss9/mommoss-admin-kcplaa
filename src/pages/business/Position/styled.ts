import styled from 'styled-components';

import { Text } from '@components/Text/styled';

export const SwitchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 16px 0;
  > ${Text} {
    margin-right: 16px;
    line-height: 12px;
  }
`;
