import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
    label: string; // Tekst wyświetlany na przycisku
    type?: 'button' | 'submit' | 'reset'; // Typ przycisku
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Funkcja wywoływana przy kliknięciu
    disabled?: boolean; // Czy przycisk ma być wyłączony
    className?: string; // Dodatkowe klasy CSS
};

// Definicja stylowanego komponentu Button
const StyledButton = styled.button<{ disabled: boolean, type: string }>`
  padding: 10px 20px;
  background-color: ${({disabled}) => (disabled ? '#ccc' : '#007bff')};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: ${({type}) => (type === 'button' ? '500' : 'bold')};
  font-size: 16px;
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({disabled}) => (disabled ? 0.6 : 1)};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({disabled}) => (disabled ? '#ccc' : '#0056b3')};
  }
`;

const Button: React.FC<ButtonProps> = ({
                                           label,
                                           type = 'button', // Domyślny typ to 'button'
                                           onClick,
                                           disabled = false,
                                           className = '',
                                       }) => {
    return (
        <StyledButton
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={className} // Możliwość dodania dodatkowych klas
        >
            {label}
        </StyledButton>
    );
};

export default Button;
