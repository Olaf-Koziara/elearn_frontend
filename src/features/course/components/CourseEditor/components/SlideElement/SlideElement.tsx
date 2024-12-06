import React, {createContext, useEffect, useState} from 'react';
import {
    CourseSlideElement,
    CourseSlideElementImageModel,
    CourseSlideElementModel,
    CourseSlideElementTextModel
} from "../../../../models/courseSlideModel";
import SlideElementToolbar from "./components/SlideElementToolbar/SlideElementToolbar";
import {SlideElementWrapper} from './style';


interface SlideElementProps {
    element: CourseSlideElement;
}

export const SlideElementContext = createContext<CourseSlideElementModel | null>(null);

const SlideElement = ({element}: SlideElementProps) => {
    const [isToolbarVisible, setIsToolbarVisible] = useState(false);
    useEffect(() => {
        if (isToolbarVisible) {
            document.addEventListener("click", handleToolbarClose);
        } else {
            document.removeEventListener("click", handleToolbarClose);
        }

        return () => {
            document.removeEventListener("click", handleToolbarClose);
        };
    }, [isToolbarVisible]);
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsToolbarVisible(!isToolbarVisible);
    };

    const handleToolbarClose = (event: MouseEvent) => {
        setIsToolbarVisible(false);
    }

    const renderContent = () => {
        if (element.type === 'text') {
            let textElement = element as CourseSlideElementTextModel
            const {fontSize, fontFamily, color, content} = textElement;
            return <p style={{fontSize, color, fontFamily}}>{content}</p>;
        } else if (element.type === 'image') {
            let imageElement = element as CourseSlideElementImageModel;
            return <img src={imageElement.url} alt="" draggable={false} style={{width: "100%", height: "100%"}}/>;
        }
        return null;
    };


    return (
        <SlideElementContext.Provider value={element}>
            <SlideElementWrapper $type={element.type} onContextMenu={handleContextMenu}>

                {renderContent()}
                {isToolbarVisible &&
                    <SlideElementToolbar/>
                }
            </SlideElementWrapper>
        </SlideElementContext.Provider>

    );
};

export default SlideElement;
