import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export const FormContainer = styled(Container)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 300px;
  padding: 24px;
  transform: translate(-50%, -50%);
`;
