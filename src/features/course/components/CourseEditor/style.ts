import styled from "styled-components";

export const CourseEditorWorkspace = styled.div`
  border: 0.5px solid ${({theme}) => theme.colors.primary};
  box-shadow: ${({theme}) => theme.boxShadow};
  border-radius: 4px;
  aspect-ratio: 16/9;
  position: relative;
`