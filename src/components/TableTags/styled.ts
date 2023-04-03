import styled from 'styled-components';

import colors from '@constants/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectCountBox = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin-right: 22px;
  font-weight: 500;
  > svg {
    margin-left: 12px;
    cursor: pointer;
  }
`;

export const TagBox = styled.div`
  display: flex;
  align-items: center;
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  padding: 0 8px;
  border-radius: 50vh;
  border: 1px solid ${colors.NAVY_BLUE_ORIGIN};
  font-size: 11px;
  color: ${colors.NAVY_BLUE_ORIGIN};
  > svg {
    width: 8px;
    height: 8px;
    margin-left: 6px;
    cursor: pointer;
    > path {
      fill: ${colors.NAVY_BLUE_ORIGIN};
    }
  }
`;

export const OverflowText = styled.p`
  flex-shrink: 0;
  width: '50px';
`;
