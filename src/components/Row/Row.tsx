import React, {ReactNode} from 'react';
import {RowStyled} from "./style";

export type rowJustifyOptions = 'start' | 'center' | 'end' | 'between';

interface propTypes {
    children: ReactNode
    justifyContent?: rowJustifyOptions
}

const Row = ({children, justifyContent}: propTypes) => {
    return (
        <RowStyled $justifyOption={justifyContent}>
            {children}
        </RowStyled>
    );
};

export default Row;