import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {StyledButton} from './style';

type ButtonProps = {
    label?: string,
    type?: 'button' | 'submit' | 'reset';
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
    children?: ReactNode,
    icon?: string
};
const Button: React.FC<ButtonProps> = ({
                                           label = '',
                                           type = 'button', // Domyślny typ to 'button'
                                           onClick,
                                           disabled = false,
                                           className = '',
                                           icon = '',
                                       }) => {
    return (
        <StyledButton
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={className} // Możliwość dodania dodatkowych klas
        >
            {icon && <i className={`bi bi-${icon}`}></i>}
            {label}
        </StyledButton>
    );
};

export default Button;
