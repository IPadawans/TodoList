import styled from 'styled-components';

export const Container = styled.div`
  height: 500px;
  width: 500px;

  display: flex;
  flex-direction: column;

  input,
  label,
  button,
  textarea {
    max-height: 20px;
    height: 20px;
    margin-left: 10px;
  }

  label {
    margin-top: 50px;
  }

  #description {
    max-height: 70px;
    height: 70px;
  }

  button {
    margin-top: 20px;
    border: none;
    max-width: 100px;
    text-align: center;
    color: #fff;
    background-color: #7159c1;
    cursor: pointer;
  }
`;
