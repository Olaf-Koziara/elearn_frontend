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
    initialPosition?: { x: number, y: number }
    initialSize?: { width: number, height: number };
    onChange?: (position: { x: number, y: number }, size: { width: number, height: number }, id: string) => any;
    id?: string;

}

const Scaler = ({component, initialPosition, initialSize, onChange, id}: propTypes) => {
    const [height, setHeight] = useState<number>(100)
    const [width, setWidth] = useState<number>(100)
    const [position, setPosition] = useState<{ x: number, y: number }>()
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


    const handleMouseMoveImage = (e: MouseEvent, mousePosition: { x: number, y: number }, imagePosition: { x: number, y: number }) => {
        if (e.buttons === 1) {
            const calculatedPosition = {
                x: e.clientX - mousePosition.x + imagePosition.x,
                y: e.clientY - mousePosition.y + imagePosition.y
            }
            if (scaleAreaElement && calculatedPosition.x > 0 && calculatedPosition.x + width < scaleAreaElement.offsetWidth && calculatedPosition.y > 0 && calculatedPosition.y + height < scaleAreaElement.offsetHeight) {
                setPosition({x: calculatedPosition.x, y: calculatedPosition.y})
            }
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
        e.stopPropagation();
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
            if (position) {
                onChange && onChange(position, {width: width, height: height}, id ?? '')
            }
        })
    }
    const handleDOMElementLoaded = () => initialSize && initialSize.width > 0 && calculateSizeOnInit();


    return (

        <div

            draggable="false"
            className="scaler"
            onMouseDown={(e) => handleMouseDown(e, handleMouseMoveImage)}
            onLoad={handleDOMElementLoaded} ref={scalerRef}
            style={{left: position ? position.x : 0, top: position ? position.y : 0, width: width, height: height}}>
            {component}

            <div onMouseDown={(e) => handleMouseDown(e, handleMouseMoveScaleImage)} className='scaler_scale'/>
        </div>
    );
};

export default Scaler;