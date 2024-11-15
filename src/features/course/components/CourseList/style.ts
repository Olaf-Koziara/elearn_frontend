import styled from "styled-components";

export const CourseListStyled = styled.ul`
  padding-top: ${({theme}) => `calc( 2 * ${theme.spacing.md} )`};
  list-style: none;
  display: flex;
  gap: ${({theme}) => `calc( 2 * ${theme.spacing.md} ) calc( 2 *  ${theme.spacing.lg} )`};
  justify-content: start;
  flex-wrap: wrap;



`