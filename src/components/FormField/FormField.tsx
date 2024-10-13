import React from 'react';

type FormFieldProps = {
    label?: string;
    type?: string; // Typ pola, domyślnie "text"
    value: string;
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
                                                 required = false
                                             }) => {
    return (
        <div className="form-field">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onInput={onInput}
                placeholder={placeholder}
                required={required}
                className="input-field"
            />
        </div>
    );
};

export default FormField;
