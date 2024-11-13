import React, {ReactNode, useEffect, useState} from 'react';
import {DropdownContentStyled, RelativeWrapper, DropdownLabelStyled} from './style';

export type DropdownDirection = 'up' | 'down' | 'left' | 'right';

interface DropdownProps {
    isOpen?: boolean,
    direction?: DropdownDirection,
    children: ReactNode,
    label: ReactNode
}

export const Dropdown = ({isOpen, children, label, direction}: DropdownProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen ?? false)
    useEffect(() => {
        if (isOpen !== undefined) {
            setIsDropdownOpen(isOpen)
        }
    }, [isOpen])

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("click", handleDropdownClose);
        } else {
            document.removeEventListener("click", handleDropdownClose);
        }

        return () => {
            document.removeEventListener("click", handleDropdownClose);
        };
    }, [isDropdownOpen]);
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const prevState = isDropdownOpen;
        setIsDropdownOpen(!prevState);
        event.stopPropagation();

    }
    const handleDropdownClose = (e: MouseEvent) => {
        setIsDropdownOpen(false);
    }
    return (
        <RelativeWrapper>
            <DropdownLabelStyled onClick={handleClick}>
                {label}
            </DropdownLabelStyled>
            <DropdownContentStyled $direction={direction} $isOpen={isDropdownOpen}>
                {children}
            </DropdownContentStyled>
        </RelativeWrapper>
    );
};

