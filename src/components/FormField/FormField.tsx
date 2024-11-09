import React, {ForwardedRef, forwardRef, ReactNode} from 'react';
import {InputStyled, TextAreaStyled, FormFieldLabelStyled} from './style';

export type FormFieldType = 'text' | 'textarea' | 'file' | 'email' | 'password';
type FormFieldProps = {
    type?: FormFieldType; // Typ pola, domyślnie "text"
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onInput?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    outline?: boolean;
    children?: ReactNode
};

const FormField: React.FC<FormFieldProps> = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(({
                                                                                                                    type = 'text', // Domyślnie "text"
                                                                                                                    required = false,
                                                                                                                    className,
                                                                                                                    disabled = false,
                                                                                                                    children,
                                                                                                                    ...otherProps
                                                                                                                }, ref) => {


    return (
        <FormFieldLabelStyled type={type} placeholder={type === 'file' ? otherProps.placeholder = "Select file" : ''}>
            {children}
            {type === 'textarea' ?
                <TextAreaStyled ref={ref as ForwardedRef<HTMLTextAreaElement>} disabled={disabled} {...otherProps}/> :
                <InputStyled type={type} ref={ref as ForwardedRef<HTMLInputElement>} disabled={disabled}
                             required={required}   {...otherProps}/>}
        </FormFieldLabelStyled>
    );

});

export default FormField;
