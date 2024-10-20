import React from 'react';
import styled from "styled-components";

type FormFieldProps = {
    label?: string;
    type?: string; // Typ pola, domyślnie "text"
    value?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
    placeholder?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    outline?: boolean;
};

const FormField: React.FC<FormFieldProps> = ({
                                                 label,
                                                 type = 'text', // Domyślnie "text"
                                                 placeholder,
                                                 name,
                                                 required = false,
                                                 className,
                                                 disabled = false,
                                                 ...otherProps
                                             }) => {


    return (
        <FormFieldWrapper className={`form-field ${className}`} $disabled={disabled}>
            {label && <label htmlFor={name}>{label}</label>}
            <FormFieldStyled type={type}
                             required={required}
                             $disabled={disabled}
                             {...otherProps}>

            </FormFieldStyled>
        </FormFieldWrapper>
    );
};
const FormFieldStyled = styled.input<{ $disabled?: boolean, $outline?: boolean }>`
  background: transparent;
  width: 100%;
  outline: none;
  cursor: ${(props) => props.$disabled ? 'default' : 'auto'};
  pointer-events: ${(props) => props.$disabled ? 'none' : 'all'};
  border: none`
const FormFieldWrapper = styled.div<{ $disabled?: boolean }>`
  padding: 0.4rem 0.8rem;
  position: relative;
  background-image: ${(props) => props.$disabled ? 'linear-gradient(rgba(230, 230, 230, 0.3),rgba(230, 230, 230, 0.3))' : `linear-gradient(#20aee3, #20aee3), linear-gradient(#bfbfbf, #bfbfbf)`};
  background-size: ${(props) => props.$disabled ? '100% 100%' : '0 2px, 0 1px'};
  background-position: ${(props) => props.$disabled ? 'left bottom' : 'center bottom, center calc(100% - 1px)'};
  background-repeat: no-repeat;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15) inset;
  border-radius: 20px;
  transition: background-size 200ms linear;


  &:focus-within {
    background-size: 100% 1px, 100% 1px;
  }

`;
export default FormField;
