import styled from 'styled-components';

export const Container = styled.div`
  height: 200px;
  width: 200px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  input {
    width: 200px;
    height: 30px;
    margin-left: 10px;
    margin-top: 20px;
  }

  button {
    max-height: 20px;
    height: 20px;
    margin-left: 10px;
    margin-top: 20px;
    border: none;
    max-width: 100px;
    text-align: center;
    color: #fff;
    background-color: #7159c1;
    cursor: pointer;
  }
`;
