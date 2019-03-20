import styled, { css } from 'styled-components';

export const Container = styled.article`
  width: 80%;
  margin: 40px auto 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Detail = styled.article`
  width: 100%;
  max-width: 500px;
  margin: 40px auto 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    width: 100%;
    text-align: center;
    font-size: 22px;
    margin-bottom: 5px;
  }
  span {
    color: #999;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }

  p {
    font-size: 17px;
  }
`;
export const DataLocal = styled.div`
  align-items: flex-start;
  margin: 30px 0 40px;
`;

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const ButtonSubmit = styled.button`
  width: 250px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5556e;
  padding: 10px;
  border-radius: 25px;
  font-size: 20px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s;

  &:hover {
    background: #d82442;
    color: #fff;
  }

  ${props => props.check === 'ok'
    && css`
      background: #088A08;

      &:hover {
        background: #0B610B;
        opacity: 0.6;
      }
    `}

  i {
    font-size: 30px;
    animation-name: rodaroda;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
`;
