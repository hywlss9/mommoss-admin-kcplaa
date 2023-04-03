import styled from 'styled-components';

export const Container = styled.div<{ search?: boolean }>`
  position: relative;
  .ant-input-search {
    width: 300px;
    ${({ search }) => search && 'margin-bottom: 16px;'};
  }
`;

export const TopTagsBox = styled.div`
  padding-bottom: 16px;
`;
