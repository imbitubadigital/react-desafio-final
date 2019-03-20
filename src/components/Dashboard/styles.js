import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;

  header {
    margin-bottom: 10px;
    h1 {
      padding-left: 10px;
      font-size: 22px;

      display: flex;
      align-items: center;
      span {
        margin-left: 10px;
        i {
          font-size: 20px;
          animation-name: rodaroda;
          animation-duration: 1s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      }
      small {
        font-size: 14px;
        font-weight: normal;
        margin-left: 15px;
      }
    }
  }
`;

export const SearchImput = styled.input`
  background: #2f2d38;
  width: 100%;
  border: 0;
  padding: 10px 40px;
  border-radius: 5px;
  margin-bottom: 40px;
  font-size: 18px;
  background-image: url(${props => props.bg});
  background-repeat: no-repeat;
  background-position: left 5px center;
  background-size: 30px;
  color: #fff;
  transition: all 0.3s;

  &:focus {
    background-color: #434149;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  margin-bottom: 10px;

  > p {
    margin-top: 100px;
  }
`;
export const Article = styled.article`
  background: #fff;
  margin: 20px 10px;
  flex-basis: calc(33.33% - 20px);
  color: #000;
  border-radius: 5px;
  animation: fadein 1s;

  @media (max-width: 900px) {
    flex-basis: calc(50% - 20px);
  }
  @media (max-width: 600px) {
    flex-basis: calc(100% - 20px);
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Image = styled.div`
  background: #1d1a24;
  height: 140px;
  border-radius: 5px 5px 0 0;
  position: relative;
  img {
    width: 100%;
    height: auto;
    border-radius: 5px 5px 0 0;
    animation: fadein 1s;

    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  div {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    a,
    button {
      text-decoration: none;
      border: 0;
      width: 30px;
      height: 30px;
      border-radius: 50px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s;
    }
    a {
      background-color: rgba(0, 145, 228, 0.6);
      &:hover {
        background-color: rgba(0, 145, 228, 1);
        border-radius: 30%;
      }
    }
    button {
      background-color: rgba(250, 0, 35, 0.8);
      &:hover {
        background-color: rgba(250, 0, 35, 1);
        border-radius: 30%;
      }
    }
  }
`;
export const BoxDetail = styled.div`
  padding: 10px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
    background: #e5556e;
    color: #fff;
    width: 42px;
    height: 41px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;

    &:hover {
      background: #de2545;
    }
  }
`;
export const Detail = styled.div`
  margin-right: 10px;
  flex: 1;

  h2 {
    font-size: 18px;
    color: #333;
    margin-bottom: 5px;
  }

  p {
    font-size: 15px;
    color: #999;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 15px;
  }
`;

export const Categories = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: #f4f4f4;
  border-radius: 0 0 5px 5px;
  span {
    background: #666;
    margin: 4px;
    padding: 4px 8px;
    color: #fff;
    font-size: 11px;
    transform: skewx(-11deg);
    transform-origin: bottom left;
  }
`;

export const LoadMore = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 50px;

  i {
    font-size: 30px;
    animation-name: rodaroda;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
`;

export const Btn = styled.button`
  background: transparent;
  border: 1px solid transparent;
  padding: 8px 12px;
  transition: all 0.3s;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;

  &:hover {
    border-color: rgba(255, 255, 255, 0.7);
    color: #fff;
  }
`;
