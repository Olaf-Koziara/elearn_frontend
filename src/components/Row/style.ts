import styled from "styled-components";
import {rowJustifyOptions} from "./Row";

interface rowStyledProps {
    $justifyOption?: rowJustifyOptions
}

export const RowStyled = styled.div<rowStyledProps>`
  display: flex;
  margin: 0 -0.8rem;
  justify-content: ${(props) => props.$justifyOption ?? 'start'};
`