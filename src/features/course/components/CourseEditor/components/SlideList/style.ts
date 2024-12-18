import styled from "styled-components";

export const SlideListStyled = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing.md};
  max-height: 50%;
  overflow-y: scroll;

  li {
    cursor: pointer;
  }
`