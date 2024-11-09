import React, {ReactNode} from 'react';
import {ColumnStyled} from "./style";

export type columnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface propTypes {
    size: columnSize
    mobileSize?: columnSize
    children?: ReactNode
}

const Column = ({size, mobileSize = 10, children}: propTypes) => {
    return (
        <ColumnStyled $size={size} $mobileSize={mobileSize}>
            {children}
        </ColumnStyled>
    );
};

export default Column;