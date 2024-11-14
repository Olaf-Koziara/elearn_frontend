import React, {ForwardedRef, forwardRef, ReactNode, useState} from 'react';
import {InputStyled, TextAreaStyled, FormFieldLabelStyled} from './style';

export type FormFieldType = 'text' | 'textarea' | 'file' | 'email' | 'password' | 'number';
type FormFieldProps = {
    type?: FormFieldType; // Typ pola, domyślnie "text"
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInput?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    outline?: boolean;
    min?: string | number;
    max?: string | number;
    value?: any;
    children?: ReactNode
};

const FormField: React.FC<FormFieldProps> = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(({
                                                                                                                    type = 'text', // Domyślnie "text"
                                                                                                                    required = false,
                                                                                                                    className,
                                                                                                                    disabled = false,
                                                                                                                    children,
                                                                                                                    onChange,
                                                                                                                    max,
                                                                                                                    min,
                                                                                                                    ...otherProps
                                                                                                                }, ref) => {
    const [value, setValue] = useState<string>('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        if (type != 'file') {
            setValue(e.target.value);

        } else {
            const targetFiles = (e.target as HTMLInputElement).files;
            targetFiles && setValue(targetFiles[0].name);
            otherProps.placeholder = value;
        }

    }

    return (
        <FormFieldLabelStyled type={type}
                              placeholder={type === 'file' ? value ? value : otherProps.placeholder = "Select file" : ''}>
            {children ? children : type === 'file' ? <i className="bi bi-file-earmark-arrow-up-fill"></i> : ''}
            {type === 'textarea' ?
                <TextAreaStyled ref={ref as ForwardedRef<HTMLTextAreaElement>} disabled={disabled} {...otherProps}/> :
                <InputStyled type={type} onChange={handleChange} ref={ref as ForwardedRef<HTMLInputElement>}
                             disabled={disabled}
                             required={required} min={type === 'number' ? min : undefined}
                             max={type === 'number' ? max : undefined}    {...otherProps}/>}
        </FormFieldLabelStyled>
    );

});

export default FormField;
