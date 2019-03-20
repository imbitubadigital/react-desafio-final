import styled from 'styled-components';

export const Container = styled.div`
  width: 80%;
  margin: 40px auto 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1024px) {
    width: 96%;
  }
`;
