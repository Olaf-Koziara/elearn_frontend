// InputField.js
import styled, {css} from 'styled-components';
import {FormFieldType} from "./FormField";

const inputStyles = css`
  width: 100%;
  padding: ${({theme}) => theme.spacing.sm};
  margin: ${({theme}) => theme.spacing.xs};
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: ${({theme}) => theme.borderRadius};
  font-size: ${({theme}) => theme.typography.text};
  color: ${({theme}) => theme.colors.primary};
  background-color: ${({theme}) => theme.colors.white};
  box-shadow: ${({theme}) => theme.boxShadow};
  outline: none;
  transition: border-color ${({theme}) => theme.transitions.default};

  &::placeholder {
    color: ${({theme}) => theme.colors.secondary};
  }

  &:focus {
    border-color: ${({theme}) => theme.colors.accent};
  }
`;

const textInputStyles = css`
  background-repeat: no-repeat;
  background-position: 10px center;
`;

const emailInputStyles = css`

  background-repeat: no-repeat;
  background-position: 10px center;
  padding-left: 2.5rem;
`;

const passwordInputStyles = css`
  letter-spacing: 0.1rem;
  padding-left: 1rem;
`;

const fileInputStyles = css`
  
  position: relative;
  padding: 0;
  margin: ${({theme}) => theme.spacing.xs};
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  font-size: ${({theme}) => theme.typography.text};
  color: ${({theme}) => theme.colors.accent};
  box-shadow: none;


  &:hover::before {
    background-color: ${({theme}) => theme.colors.background};
  }
`
const labelStyles = css`
  display: block;
`
const fileLabelStyles = css`

`

export const FormFieldStyled = styled.input`
  ${inputStyles}

  ${({type}) => type === 'text' && textInputStyles}
  ${({type}) => type === 'email' && emailInputStyles}
  ${({type}) => type === 'password' && passwordInputStyles}
  ${({type}) => type === 'file' && fileInputStyles}
`;
export const FormFieldLabelStyled = styled.label<{ type: FormFieldType }>`
  ${labelStyles}
  ${({type}) => type === 'file' && fileLabelStyles}
`