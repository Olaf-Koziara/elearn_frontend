import React, {useState, ReactNode, useRef, useEffect, useLayoutEffect} from 'react';
import "./Draggable.scss"

interface DraggableProps {
    children: ReactNode;
    onPositionChange?: (position: { x: number; y: number }) => any;
    onSizeChange?: (size: { width: number; height: number }) => any;
    id: string;
    initialPosition?: { x: number, y: number }
    initialSize?: { width: number, height: number };
    resizeable?: boolean;
    parentRef?: React.RefObject<HTMLDivElement>
}


const Draggable: React.FC<DraggableProps> = ({
                                                 children,
                                                 onPositionChange,
                                                 onSizeChange,
                                                 id,
                                                 initialPosition,
                                                 initialSize,
                                                 resizeable,
                                                 parentRef
                                             }) => {
    const [position, setPosition] = useState<{ x: number; y: number }>({x: 0, y: 0});
    const [size, setSize] = useState<{ width: number; height: number }>({width: 200, height: 100});
    const [parentSize, setParentSize] = useState<{ width: number; height: number }>({width: 0, height: 0});
    const isDragging = useRef<boolean>(false);
    const isResizing = useRef<boolean>(false);
    const startDragPosition = useRef<{ x: number; y: number }>({x: 0, y: 0});
    const startResizeSize = useRef<{ width: number; height: number }>({width: 0, height: 0});
    useLayoutEffect(() => {
        if (parentRef) {
            const parentRect = parentRef.current?.getBoundingClientRect();
            parentRect && setParentSize({width: parentRect.width, height: parentRect.height});
        }
        initialPosition && setPosition(initialPosition);
        initialSize && setSize(initialSize);

    }, [])

    const handleMouseDownDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        isDragging.current = true;
        startDragPosition.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {

        if (isDragging.current) {
            let newPosition;
            if (parentSize.width) {
                const newX = Math.min(
                    Math.max(0, e.clientX - startDragPosition.current.x),
                    parentSize.width - size.width
                );

                const newY = Math.min(
                    Math.max(0, e.clientY - startDragPosition.current.y),
                    parentSize.height - size.height
                );

                newPosition = {
                    x: newX,
                    y: newY
                };
            } else {
                newPosition = {
                    x: e.clientX - startDragPosition.current.x,
                    y: e.clientY - startDragPosition.current.y,
                }
            }
            setPosition(newPosition);
            onPositionChange && onPositionChange(newPosition);
        }


        if (isResizing.current) {
            let newSize;
            if (parentSize.width) {
                newSize = {
                    width: Math.min(Math.max(50, e.clientX - startDragPosition.current.x + startResizeSize.current.width), parentSize.width - position.x),
                    height: Math.min(Math.max(50, e.clientY - startDragPosition.current.y + startResizeSize.current.height), parentSize.height - position.y)
                }
            } else {

                newSize = {
                    width: Math.max(50, e.clientX - startDragPosition.current.x + startResizeSize.current.width),
                    height: Math.max(50, e.clientY - startDragPosition.current.y + startResizeSize.current.height)
                }
            }

            setSize(newSize);
            onSizeChange && onSizeChange(newSize);
        }

    };

    const handleMouseUp = () => {

        isDragging.current = (false);
        isResizing.current = (false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

    };


    const handleMouseDownResize = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        startDragPosition.current = ({
            x: e.clientX,
            y: e.clientY
        });
        startResizeSize.current = (size)
        isResizing.current = (true);
        isDragging.current = false;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

    };

    return (
        <div

            onMouseDown={handleMouseDownDrag}
            onMouseUp={handleMouseUp}
            className="draggable"

            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                cursor: isDragging ? 'grabbing' : 'grab',

            }}
        >
            {children}

            {
                resizeable &&
                <div className="draggable_resizer"
                     onMouseDown={handleMouseDownResize}
                ></div>
            }
        </div>
    );
};

export default Draggable;
