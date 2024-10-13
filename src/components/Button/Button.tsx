import React from 'react';
import "./Button.scss";
type ButtonProps = {
    label: string; // Tekst wyświetlany na przycisku
    type?: 'button' | 'submit' | 'reset'; // Typ przycisku
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Funkcja wywoływana przy kliknięciu
    disabled?: boolean; // Czy przycisk ma być wyłączony
    className?: string; // Dodatkowe klasy CSS
};

const Button: React.FC<ButtonProps> = ({
                                           label,
                                           type = 'button', // Domyślny typ to 'button'
                                           onClick,
                                           disabled = false,
                                           className = '',
                                       }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`button ${className}`} // Domyślna klasa plus dodatkowe
        >
            {label}
        </button>
    );
};

export default Button;
