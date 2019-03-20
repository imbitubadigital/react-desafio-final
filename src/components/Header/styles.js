import styled from 'styled-components';

export const Container = styled.div`
  background: #e5556e;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;

  @media (max-width: 480px) {
    height: 150px;
  }
`;
export const Nav = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  li {
    margin: 0 10px;
    font-size: 17px;
    transition: all 0.4s;
    border: 1px solid #e5556e;
    padding: 5px 10px;
    border-radius: 20px;

    &:first-child {
      margin-left: 0;
      border: 0;
    }

    i {
      margin-right: 8px;
    }

    a {
      transition: all 0.4s;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.9);
      font-weight: bold;
    }

    &:hover {
      border-color: rgba(255, 255, 255, 0.7);
      color: #fff;
    }

    button {
      background: transparent;
      transition: all 0.4s;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.9);
      font-weight: bold;
      border: 0;
      font-size: 18px;
    }

    button:hover {
      border-color: rgba(255, 255, 255, 0.7);
      color: #fff;
    }

    &:hover a {
      color: #fff;
    }
  }
`;
