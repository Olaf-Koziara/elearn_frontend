import React, {ReactNode} from "react";
import styled from "styled-components";


export const StyledButton = styled.button<{ disabled: boolean, type: string }>`
  padding: 10px 20px;
  background-color: ${({disabled}) => (disabled ? '#ccc' : '#007bff')};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: ${({type}) => (type === 'button' ? '500' : 'bold')};
  font-size: 16px;
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({disabled}) => (disabled ? 0.6 : 1)};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({disabled}) => (disabled ? '#ccc' : '#0056b3')};
  }
`