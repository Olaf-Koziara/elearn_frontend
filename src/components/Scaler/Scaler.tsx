import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
    DragEvent,
    ReactChildren,
    PropsWithChildren,
    ReactNode, ReactElement
} from 'react';
import './Scaler.scss'


interface propTypes {
    component: React.ReactElement

}

const Scaler = ({component}: propTypes) => {
    const [height, setHeight] = useState<number>(100)
    const [width, setWidth] = useState<number>(100)
    const [position, setPosition] = useState<{ x: number, y: number }>({x: 0, y: 0})
    const [scaleAreaElement, setScaleAreaElement] = useState<HTMLElement | null>(null)
    const scalerRef = useRef<HTMLDivElement>(null);
    const calculateSizeOnInit = useCallback(() => {
        const initialWidth = scalerRef.current?.offsetWidth;
        const initialHeight = scalerRef.current?.offsetHeight;
        if (initialWidth && initialHeight) {
            const aspectRatio = initialWidth / initialHeight;
            const calculatedHeight = window.screen.height / 3;
            const calculatedWidth = aspectRatio * calculatedHeight;
            setHeight(calculatedHeight);
            setWidth(calculatedWidth);
        }
    }, [scalerRef])
    useEffect(() => {

    })

    const handleMouseMoveImage = (e: MouseEvent, mousePosition: { x: number, y: number }, imagePosition: { x: number, y: number }) => {
        const calculatedPosition = {
            x: e.clientX - mousePosition.x + imagePosition.x,
            y: e.clientY - mousePosition.y + imagePosition.y
        }
        if (scaleAreaElement && calculatedPosition.x > 0 && calculatedPosition.x < scaleAreaElement.offsetWidth && calculatedPosition.y > 0 && calculatedPosition.y < scaleAreaElement.offsetHeight) {
            setPosition({x: calculatedPosition.x, y: calculatedPosition.y})
        }


    }
    const handleMouseMoveScaleImage = (e: MouseEvent, mousePosition: { x: number, y: number }, imagePosition: { x: number, y: number }) => {
        const calculatedSize = {
            width: e.clientX - mousePosition.x + width,
            height: e.clientY - mousePosition.y + height
        }
        setWidth(calculatedSize.width)
        setHeight(calculatedSize.height)
    }
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, onMouseMove: (...args: any[]) => void) => {
        const mouseDownPosition = {
            x: e.clientX, y: e.clientY
        }
        if (scalerRef.current) {
            const scalerParentElement = scalerRef.current.parentElement;
            setScaleAreaElement(scalerParentElement)
        }

        const handleMove = (e: MouseEvent) => {
            onMouseMove(e, mouseDownPosition, position)
        }
        document.body.addEventListener('mousemove', handleMove)
        e.target.addEventListener('mouseup', e => {
            document.body.removeEventListener('mousemove', handleMove)
        })
    }


    return (

        <div

            draggable="false"
            className="scaler"
            onMouseDown={(e) => handleMouseDown(e, handleMouseMoveImage)}
            onLoad={calculateSizeOnInit} ref={scalerRef}
            style={{left: position.x, top: position.y, width: width, height: height}}>
            {component}

            <div onMouseDown={(e) => handleMouseDown(e, handleMouseMoveScaleImage)} className='scaler_scale'/>
        </div>
    );
};

export default Scaler;