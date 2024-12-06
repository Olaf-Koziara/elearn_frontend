// InputField.js
import styled, {css} from 'styled-components';
import {FormFieldType} from "./FormField";

const inputStyles = css`
  width: 100%;
  padding: ${({theme}) => `${theme.spacing.sm} ${theme.spacing.md}`};
  margin: ${({theme}) => theme.spacing.xs} 0;
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

  display: none;`


const labelStyles = css`
  display: block;
  position: relative;
`
const fileLabelStyles = css<{ placeholder: string }>`
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing.sm};;
  padding: 0;
  margin: ${({theme}) => theme.spacing.xs};
  border: none;
  background: none;
  cursor: pointer;
  font-size: ${({theme}) => theme.typography.text};
  color: ${({theme}) => theme.colors.accent};
  box-shadow: none;
  transition: ${({theme}) => theme.transitions.default};


  &:after, &:before {
    display: block;
    transition: ${({theme}) => theme.transitions.default};
  }


  &:after {
    content: ${(props) => `'${props.placeholder}'` || ''};
    text-wrap: nowrap;
  }


  &:hover::before, &:hover::after, &:hover > .bi {
    color: ${({theme}) => theme.colors.secondary};
  }

  .bi {
    transition: ${({theme}) => theme.transitions.default};;
    font-size: 1.75em;
  }





`

export const InputStyled = styled.input`
  ${inputStyles}

  ${({type}) => type === 'text' && textInputStyles}
  ${({type}) => type === 'email' && emailInputStyles}
  ${({type}) => type === 'password' && passwordInputStyles}
  ${({type}) => type === 'file' && fileInputStyles}
`;
export const TextAreaStyled = styled.textarea`
  width: 100%;
  margin: ${({theme}) => theme.spacing.xs} 0;
  padding: ${({theme}) => theme.spacing.md};
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: ${({theme}) => theme.borderRadius};
  font-size: ${({theme}) => theme.typography.text};
  color: ${({theme}) => theme.colors.primary};
  background-color: ${({theme}) => theme.colors.white};
  box-shadow: ${({theme}) => theme.boxShadow};
  outline: none;
  resize: vertical;
  transition: border-color ${({theme}) => theme.transitions.default},
  box-shadow ${({theme}) => theme.transitions.default};

  &::placeholder {
    color: ${({theme}) => theme.colors.secondary};
  }

  &:focus {
    border-color: ${({theme}) => theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(0, 113, 227, 0.2); /* Niebieska poświata przy focus */
  }
`;
export const FormFieldLabelStyled = styled.label<{ type: FormFieldType, placeholder: string }>`



  ${labelStyles}

  ${({type, placeholder}) => type === 'file' && fileLabelStyles}


`