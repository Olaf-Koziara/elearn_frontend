import styled from "styled-components";
import {columnSize} from "./Column";


export const ColumnStyled = styled.div<{ $size: columnSize, $mobileSize: columnSize, }>`
  padding: 0 0.8rem;
  flex: 0 0 auto;
  width: ${(props) => `${props.$size * 10}%`};
  @media (max-width: ${({theme}) => theme.breakpoints.mobile}) {
    width: ${(props) => `${props.$mobileSize * 10}%`};;
  }
`