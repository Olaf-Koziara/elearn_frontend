// Button.js
import styled, {css} from 'styled-components';

const baseButtonStyles = css`
  padding: 0.75rem 1.5rem;
  font-size: ${({theme}) => theme.typography.text};
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

const outlineStyles = css`
  background: transparent;
  color: ${({theme}) => theme.colors.accent};
  border: 1px solid ${({theme}) => theme.colors.accent};

  &:not(:disabled):hover {
    background-color: ${({theme}) => theme.colors.accent};
    color: ${({theme}) => theme.colors.white};
    box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3); /* Cień przy najechaniu */
  }
`;
export type buttonVariant = 'primary' | 'secondary' | 'outline';
// Button styled-component with variants
export const StyledButton = styled.button<{ $variant: buttonVariant }>`
  ${baseButtonStyles}
  ${({$variant}) => $variant === 'primary' && primaryStyles}
  ${({$variant}) => $variant === 'secondary' && secondaryStyles}
  ${({$variant}) => $variant === 'outline' && outlineStyles}
`;

