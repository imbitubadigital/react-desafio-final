import styled from 'styled-components';

export const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 480px) {
    margin: 40px;
    max-width: 280%;
    width: 100%;
  }

  h1 {
    font-size: 22px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    color: #999;
  }
`;

export const Logo = styled.div`
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: auto;
  height: 60px;
  margin-top: 60px;
`;

export const Box = styled.div`
  margin: 30px 0 20px;
`;

export const BoxNew = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  animation: fadein 1s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  span {
    font-size: 18px;
  }

  input,
  textarea {
    background: #2f2d38;
    width: 100%;
    border: 0;
    padding: 10px 20px;
    border-radius: 5px;
    margin-top: 20px;
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
  }
`;
export const Image = styled.div`
  width: 100%;
  height: 150px;
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin-bottom: 30px;
  cursor: pointer;
`;

export const Drop = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  border: 3px solid #c1c1c1;
  margin-bottom: 30px;
  border-style: dashed;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #fff;
    border-color: #fff;
  }

  i {
    font-size: 25px;
    margin-bottom: 10px;
  }
`;

export const Checks = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;

  input {
    -webkit-appearance: none;
    background-color: #fafafa;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 10px;
    border-radius: 3px;

    float: left;
    margin: 0;

    width: 10px;
    cursor: pointer; /* affiche un curseur adapté */

    :hover {
      background-color: #d82442;
    }

    :checked {
      background-color: #e5556e;
    }
  }
  > span {
    margin-left: 5px;
    font-size: 20px;
  }
`;
export const ButtonSubmit = styled.button`
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

  i {
    font-size: 30px;
    animation-name: rodaroda;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
`;

export const NavFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  a {
    color: #999;
    font-size: 16px;
    text-decoration: none;
    transition: all 0.3s;

    &:hover {
      color: #fff;
    }
  }
`;
