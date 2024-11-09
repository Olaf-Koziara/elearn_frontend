// Card.js
import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${({theme}) => theme.colors.white};
  border-radius: ${({theme}) => theme.borderRadius};
  box-shadow: ${({theme}) => theme.boxShadow};
  padding: 1.5rem;
  transition: box-shadow ${({theme}) => theme.transitions.default},
  transform ${({theme}) => theme.transitions.default};
  overflow: hidden;
  width: 100%;
  max-width: 400px; /* Maksymalna szerokość, którą możesz dostosować */

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15); /* Większy cień przy najechaniu */
    transform: translateY(-4px); /* Lekki efekt unoszenia */
  }
`;

// Przykład nagłówka wewnątrz karty
export const CardHeader = styled.h3`
  font-size: ${({theme}) => theme.typography.header};
  color: ${({theme}) => theme.colors.primary};
  margin-bottom: 0.75rem;
`;

// Przykład tekstu wewnątrz karty
export const CardText = styled.p`
  font-size: ${({theme}) => theme.typography.text};
  color: ${({theme}) => theme.colors.secondary};
  line-height: 1.6;
  margin: 0;
`;
