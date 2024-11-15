import styled from "styled-components";

export const ToolbarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 8px;

  button {
    margin: 4px 0;
    padding: 4px 8px;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;