import styled from "styled-components";
import {rowJustifyOptions} from "./Row";
import theme from "../../style/theme";

interface rowStyledProps {
    $justifyOption?: rowJustifyOptions
    $padding?: string
}

export const RowStyled = styled.div<rowStyledProps>`
  display: flex;
  margin: 0 -0.8rem;
  width: 100%;
  justify-content: ${(props) => props.$justifyOption ?? 'start'};
  padding: ${({$padding, theme}) => $padding ? theme.spacing[$padding] : ''};

`