import React from 'react';
import styled, {keyframes} from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const LoaderStyled = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;

  &:after {
    content: '';
    position: absolute;
    width: 4.5rem;
    height: 4.5rem;
    left: calc(50% - 2.25rem);
    top: calc(50% - 2.25rem);
    border-radius: 50%;
    border: 0.5rem solid white;
    border-bottom-color: #00B7FF;
    animation: .75s linear infinite ${rotate};
  }
`
type LoaderPropsType = {
    isLoading: boolean,
}
const Loader: React.FC<LoaderPropsType> = ({isLoading = false}) => {
    return (
        <>
            {isLoading &&
                <LoaderStyled>

                </LoaderStyled>}
        </>

    );
};

export default Loader;