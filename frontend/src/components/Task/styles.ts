import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 30px;

  p,
  strong {
    font-size: 15px;
    margin-left: 5px;
    color: #000;
  }

  #userInfo {
    display: flex;
    justify-content: space-between;

    p {
      font-weight: bold;
    }
  }

  #taskDescription {
    margin-top: 10px;
  }

  button {
    background: #7159c1;
    border: none;
    border-radius: 4px;
    padding: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    cursor: pointer;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        color: #fff;
        font-size: 15px;
      }

      svg {
        color: #fff;
      }
    }
  }
`;
