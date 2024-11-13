import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {buttonVariant, StyledButton} from './style';

type ButtonProps = {
    children?: ReactNode,
    type?: 'button' | 'submit' | 'reset';
    variant?: buttonVariant;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
    icon?: string
};
const Button: React.FC<ButtonProps> = ({
                                           children,
                                           type = 'button', // Domyślny typ to 'button'
                                           onClick,
                                           disabled = false,
                                           className = '',
                                           icon = '', variant = "primary"
                                       }) => {
    return (
        <StyledButton
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={className}
            $variant={variant}// Możliwość dodania dodatkowych klas
        >
            {icon && <i className={`bi bi-${icon}`}></i>}
            {children}
        </StyledButton>
    );
};

export default Button;
