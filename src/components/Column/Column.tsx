import React, {ReactNode} from 'react';
import {ColumnStyled} from "./style";

export type columnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface propTypes {
    size: columnSize
    children?: ReactNode
}

const Column = ({size, children}: propTypes) => {
    return (
        <ColumnStyled $size={size}>
            {children}
        </ColumnStyled>
    );
};

export default Column;