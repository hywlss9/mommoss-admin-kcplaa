import styled from 'styled-components';

import { Container as NumberTitle } from '@components/NumberTitle/styled';

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  &.not-numbers > .ant-form > * {
    margin-left: 0 !important;
  }
  > .ant-form {
    > .ant-radio-group + * {
      margin-top: 36px;
    }
    > *:not(${NumberTitle}, .ant-divider, .formContainer_not-left-margin) {
      margin-left: 40px;
    }
  }
  ${NumberTitle} {
    margin: 24px 0 16px;
  }
`;
