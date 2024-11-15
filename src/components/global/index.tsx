import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {
    DropdownContentStyled,
    RelativeWrapper,
    DropdownLabelStyled,
    ModalStyled,
    ModalLabelStyled,
    ModalConfirmationWrapperStyled
} from './style';
import Button from "../Button/Button";
import {CSSTransition} from 'react-transition-group';


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
            <DropdownContentStyled onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                                   $direction={direction} $isOpen={isDropdownOpen}>
                {children}
            </DropdownContentStyled>
        </RelativeWrapper>
    );
};

interface ModalProps {
    children: ReactNode;
    label: ReactNode;
    onConfirmation?: (...args: any) => void;
    onRejection?: (...args: any) => void;
}

export const Modal = ({children, label, onConfirmation, onRejection}: ModalProps) => {
    const nodeRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleModalClose)
        } else {
            document.removeEventListener('click', handleModalClose)
        }
        return document.removeEventListener('click', handleModalClose);
    }, [isOpen])
    const handleModalClose = () => setIsOpen(false);
    return (
        <ModalLabelStyled onClick={() => setIsOpen(true)}>
            {label}
            {isOpen &&
                <CSSTransition nodeRef={nodeRef} in={isOpen} timeout={200} classNames="modal">
                    <ModalStyled ref={nodeRef}>
                        {children}
                        {(onConfirmation || onRejection) &&
                            <ModalConfirmationWrapperStyled>
                                <Button onClick={onConfirmation}>Confirm</Button>
                                <Button onClick={onRejection}>Reject</Button>
                            </ModalConfirmationWrapperStyled>}
                    </ModalStyled>
                </CSSTransition>
            }
        </ModalLabelStyled>
    )
}
