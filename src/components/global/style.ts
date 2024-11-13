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
