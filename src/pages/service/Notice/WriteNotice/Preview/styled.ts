import styled from 'styled-components';

import type * as T from './type';

export const Container = styled.div<{ type: T.PreviewMenu }>`
  position: relative;
  > .ant-menu {
    padding: 0 16px;
  }
`;
