// Button.js
import styled, {css} from 'styled-components';
import {buttonSize, buttonVariant} from "./Button";

const baseButtonStyles = css`
  font-weight: 600;
  border-radius: ${({theme}) => theme.borderRadius};
  cursor: pointer;
  transition: background-color ${({theme}) => theme.transitions.default},
  color ${({theme}) => theme.transitions.default},
  box-shadow ${({theme}) => theme.transitions.default};
  display: inline-block;
  text-align: center;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
    background-color: ${({theme}) => theme.colors.disabledBackground};
    color: ${({theme}) => theme.colors.disabledText};
    border-color: ${({theme}) => theme.colors.disabledBorder};
  }
`;

const primaryStyles = css`
  background-color: ${({theme}) => theme.colors.accent};
  color: ${({theme}) => theme.colors.white};
  border: none;

  &:not(:disabled):hover {
    background-color: ${({theme}) => theme.colors.primary};
    box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3); /* Subtelny cień */
  }
`;

const secondaryStyles = css`
  background-color: ${({theme}) => theme.colors.white};
  color: ${({theme}) => theme.colors.primary};
  border: 1px solid ${({theme}) => theme.colors.border};

  &:not(:disabled):hover {
    background-color: ${({theme}) => theme.colors.background};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* Delikatny cień */
  }
`;
const dangerStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: ${({theme}) => theme.colors.danger};;
  border: none;
  border-radius: ${({theme}) => theme.borderRadius};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background: #d9372b;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background: #c12e27;
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(255, 59, 48, 0.4); /* Efekt focus */
  }

  &:disabled {
    background: #f3f3f3;
    color: #a1a1a1;
    cursor: not-allowed;
    box-shadow: none;
  }
`

const outlineStyles = css`
  background: transparent;
  color: ${({theme}) => theme.colors.accent};
  border: 1px solid ${({theme}) => theme.colors.accent};

  &:not(:disabled):hover {
    background-color: ${({theme}) => theme.colors.accent};
    color: ${({theme}) => theme.colors.white};
    box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3);
  }
`;
const buttonSizeVariants = {
    xs: css`
      padding: 0.5rem 1rem;
      font-size: calc(0.75 * ${({theme}) => theme.typography.text});
    `,
    sm: css`
      padding: 0.5rem 1rem;
      font-size: calc(0.9 * ${({theme}) => theme.typography.text});
    `,
    md: css`
      padding: 0.75rem 1.5rem;
      font-size: ${({theme}) => theme.typography.text};
    `,
    lg: css`
      padding: 0.8rem 1.6rem;
      font-size: calc(1.25 * ${({theme}) => theme.typography.text});;`
}


// Button styled-component with variants
export const StyledButton = styled.button<{ $variant: buttonVariant, $size: buttonSize }>`
  ${baseButtonStyles}
  ${({$variant}) => $variant === 'primary' && primaryStyles}
  ${({$variant}) => $variant === 'secondary' && secondaryStyles}
  ${({$variant}) => $variant === 'outline' && outlineStyles}
  ${({$variant}) => $variant === 'outline' && outlineStyles}
  ${({$size}) => buttonSizeVariants[$size]}
  
`;

