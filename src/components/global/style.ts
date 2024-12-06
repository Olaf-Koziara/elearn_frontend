import styled, {css} from "styled-components";

export type DropdownDirection = "up" | "down" | "left" | "right";

export const RelativeWrapper = styled.div`
  position: relative;
`;

const DropdownUpTransform = css<{ $isOpen: boolean }>`
  transform: translate(-50%, ${({$isOpen}) => ($isOpen ? "0" : "100%")}) scaleY(${({$isOpen}) => ($isOpen ? 1 : 0)});
`;

const DropdownDownTransform = css<{ $isOpen: boolean }>`
  transform: translate(-50%, ${({$isOpen}) => ($isOpen ? "0" : "-100%")}) scaleY(${({$isOpen}) => ($isOpen ? 1 : 0)});
`;

const DropdownLeftTransform = css<{ $isOpen: boolean }>`
  transform: translate(${({$isOpen}) => ($isOpen ? "-100%" : "0")}, -50%) scaleX(${({$isOpen}) => ($isOpen ? 1 : 0)});
`;

const DropdownRightTransform = css<{ $isOpen: boolean }>`
  transform: translate(${({$isOpen}) => ($isOpen ? "100%" : "0")}, -50%) scaleX(${({$isOpen}) => ($isOpen ? 1 : 0)});
`;

export const DropdownContentStyled = styled.div<{ $isOpen: boolean; $direction?: DropdownDirection }>`
  position: absolute;
  z-index: 1;
  ${({$direction}) => {
    switch ($direction) {
      case "up":
        return "bottom: 100%; left: 50%;";
      case "down":
        return "top: 100%; left: 50%;";
      case "left":
        return "right: 100%; top: 50%;";
      case "right":
        return "left: 100%; top: 50%;";
      default:
        return "top: 100%; left: 50%;"; // Default to 'down'
    }
  }}
  transform-origin: ${({$direction}) => {
    switch ($direction) {
      case "up":
      case "down":
        return "top";
      case "left":
      case "right":
        return "left";
      default:
        return "top"; // Default to 'down'
    }
  }};
  ${({$isOpen, $direction}) => {
    switch ($direction) {
      case "up":
        return DropdownUpTransform;
      case "down":
        return DropdownDownTransform;
      case "left":
        return DropdownLeftTransform;
      case "right":
        return DropdownRightTransform;
      default:
        return DropdownDownTransform; // Default to 'down'
    }
  }};
  transition: 200ms ease-in-out;
`;

export const DropdownLabelStyled = styled.div`
  cursor: pointer;
  transition: ${({theme}) => theme.transitions.default};

  &:hover {
    * {
      color: ${({theme}) => theme.colors.secondary};
    }
  }
`;
export const ModalWrapperStyled = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: ${({theme}) => theme.colors.primaryTransparent};
`
export const ModalStyled = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  min-width: 160px;
  min-height: 80px;
  transform: translate(-50%, -50%);
  padding: ${({theme}) => theme.spacing.md};
  border-radius: ${({theme}) => theme.borderRadius};
  box-shadow: ${({theme}) => theme.boxShadow};
  background: ${({theme}) => theme.colors.background};
  transition: ${({theme}) => theme.transitions.default};
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing.sm};

  &.modal-enter {
    opacity: 0;
  }

  &.modal-active {
    opacity: 0.2;
  }
`
export const ModalLabelStyled = styled.div`

`
export const ModalConfirmationWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
`


export const Card = styled.div<{ $spacing?: string, $active?: boolean }>`
  background-color: ${({theme, $active}) => !$active ? theme.colors.white : theme.colors.background};
  border-radius: ${({theme}) => theme.borderRadius};
  box-shadow: ${({theme}) => theme.boxShadow};
  padding: ${({theme, $spacing}) => $spacing ? theme.spacing[$spacing] : '1.5rem'};
  transition: ${({theme}) => theme.transitions.default},
  transform ${({theme}) => theme.transitions.default};
  overflow: hidden;
  width: 100%;
  max-width: 400px; /* Maksymalna szerokość, którą możesz dostosować */

  * {
    text-decoration: none;
  }

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15); /* Większy cień przy najechaniu */
    transform: translateY(-4px); /* Lekki efekt unoszenia */
  }
`;
export const CardImage = styled.div<{ $aspectRatio?: number }>`
  width: 100%;
  aspect-ratio: ${({$aspectRatio}) => $aspectRatio};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const CardHeader = styled.h3`
  font-size: ${({theme}) => theme.typography.header};
  color: ${({theme}) => theme.colors.primary};
  margin-bottom: 0.75rem;
`;


export const CardText = styled.p`
  font-size: ${({theme}) => theme.typography.text};
  color: ${({theme}) => theme.colors.secondary};
  line-height: 1.6;
  margin: 0;
`;

