import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 15px;
  height: 100%;
  flex: 0 0 320px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  & + div {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h2 {
      font-weight: bold;
      font-size: 16px;
      padding: 0 10px;
    }
    div {
      display: flex;
      button {
        margin-left: 5px;
        background-color: #f40000;
        border: none;
        border-radius: 4px;
        color: #fff;
        padding: 5px 10px;
        cursor: pointer;
      }
    }
  }
  ul {
    max-width: 100%;
    width: 500px;
  }
`;
