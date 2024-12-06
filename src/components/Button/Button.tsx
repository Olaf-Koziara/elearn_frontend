import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {StyledButton} from './style';

export type buttonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type buttonSize = 'xs' | 'sm' | 'md' | 'lg';
type ButtonProps = {
    children?: ReactNode,
    type?: 'button' | 'submit' | 'reset';
    variant?: buttonVariant;
    size?: buttonSize;
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
                                           icon = '', variant = "primary",
                                           size = "md"
                                       }) => {
    return (
        <StyledButton
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={className}
            $variant={variant}
            $size={size}
        >
            {icon && <i className={`bi bi-${icon}`}></i>}
            {children}
        </StyledButton>
    );
};

export default Button;
