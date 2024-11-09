import React, {ReactNode} from 'react';
import {RowStyled} from "./style";

export type rowJustifyOptions = 'start' | 'center' | 'end' | 'between';

interface propTypes {
    children: ReactNode
    justifyContent?: rowJustifyOptions
    className?: string
    padding?: string
}

const Row = ({children, justifyContent, className, padding}: propTypes) => {
    return (
        <RowStyled $justifyOption={justifyContent} $padding={padding} className={className}>
            {children}
        </RowStyled>
    );
};

export default Row;