import styled from 'styled-components';

export const EditorToolbarWrapper = styled.div`
  padding-top: ${({theme}) => theme.spacing.sm};
  display: flex;
  justify-content: space-between;
`;
export const EditorToolbarLeftSide = styled.div`
  display: flex;

  gap: ${({theme}) => theme.spacing.md};

  i {
    font-size: 1.8rem;
  }
`;
export const EditorToolbarRightSide = styled.div`
  display: flex;
  gap: ${({theme}) => theme.spacing.sm};
`;


