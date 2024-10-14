import React from 'react';
import styled from "styled-components";

type FormFieldProps = {
    label?: string;
    type?: string; // Typ pola, domyślnie "text"
    value: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
    placeholder?: string;
    name?: string;
    required?: boolean;
};

const FormField: React.FC<FormFieldProps> = ({
                                                 label,
                                                 type = 'text', // Domyślnie "text"
                                                 value,
                                                 onChange,
                                                 onInput,
                                                 placeholder,
                                                 name,
                                                 required = false,
                                                 className
                                             }) => {
    const FormFieldWrapper = styled.div`
      padding: 0.4rem;
      position: relative;
      background-image: linear-gradient(#20aee3, #20aee3), linear-gradient(#bfbfbf, #bfbfbf);
      background-size: 0 2px, 100% 1px;
      background-position: center bottom, center calc(100% - 1px);
      background-repeat: no-repeat;
      transition: background-size 200ms linear;

      &:focus-within {
        background-size: 100% 2px, 100% 1px;
      }

    `;
    const FormField = styled.input`
      background: transparent;
      border: none;
      width: 100%;
      outline: none;
    `
    return (
        <FormFieldWrapper className={`form-field ${className}`}>
            {label && <label htmlFor={name}>{label}</label>}
            <FormField type={type} value={value} onChange={onChange} onInput={onInput} required={required}>

            </FormField>
        </FormFieldWrapper>
    );
};

export default FormField;
