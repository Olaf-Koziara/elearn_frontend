import React, {forwardRef, ReactNode} from 'react';
import styled from "styled-components";
import {FormFieldStyled, FormFieldLabelStyled} from './style';

export type FormFieldType = 'text' | 'textarea' | 'file' | 'email' | 'password';
type FormFieldProps = {
    type?: FormFieldType; // Typ pola, domyślnie "text"
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
    placeholder?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    outline?: boolean;
    children?: ReactNode
};

const FormField: React.FC<FormFieldProps> = forwardRef<HTMLInputElement, FormFieldProps>(({
                                                                                              type = 'text', // Domyślnie "text"
                                                                                              placeholder
                                                                                              , required = false,
                                                                                              className,
                                                                                              disabled = false,
                                                                                              children,
                                                                                              ...otherProps
                                                                                          }, ref) => {


    return (
        <FormFieldLabelStyled type={type}>
            {children}
            <FormFieldStyled type={type} ref={ref}   {...otherProps}/>
        </FormFieldLabelStyled>
    );

});

export default FormField;
