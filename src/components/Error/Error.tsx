import React, {PropsWithChildren, ReactChildren} from 'react';
import styled from "styled-components";
import {ReactNode} from "react/index";

interface ErrorProps {
    children: ReactNode
}

const ErrorStyled = styled.div<{}>`
  color: red;
`
const Error = (props: ErrorProps) => {
    return (
        <ErrorStyled>
            {props.children}
        </ErrorStyled>
    );
};

export default Error;