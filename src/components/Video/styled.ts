import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const VideoBox = styled.div`
  min-width: 120px;
  min-height: 68px;
  position: relative;
  img {
    width: 120px;
    height: 68px;
    object-fit: cover;
  }
  p {
    padding: 0 4px;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.8);
    font-size: 10px;
    color: white;
    position: absolute;
    bottom: 2px;
    right: 3px;
  }
`;

export const TitleBox = styled.div`
  overflow: hidden;
  margin: 10px 0 0 16px;
  text-overflow: ellipsis;
  line-height: 18px;
  white-space: nowrap;
`;
