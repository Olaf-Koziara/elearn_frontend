import styled from "styled-components";

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  label {
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }

  input, select {
    margin-top: 5px;
    padding: 5px;
    font-size: 14px;
  }

  button {
    padding: 10px;
    background-color: #007aff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #005bb5;
    }
  }
`;