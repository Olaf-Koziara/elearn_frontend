import React, {useState} from 'react';
import styled from 'styled-components';
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


const SlideElement = ({element,}: SlideElementProps) => {
    const [isToolbarVisible, setIsToolbarVisible] = useState(false);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsToolbarVisible(!isToolbarVisible);
    };

    const renderContent = () => {
        if (element.type === 'text') {
            let textElement = element as CourseSlideElementTextModel
            return <p style={{fontSize: textElement.fontSize}}>{textElement.content}</p>;
        } else if (element.type === 'image') {
            let imageElement = element as CourseSlideElementImageModel;
            return <img src={imageElement.url} alt="" draggable={false} style={{width: "100%", height: "100%"}}/>;
        }
        return null;
    };
    const handleClick = (event: React.MouseEvent) => {
        setIsToolbarVisible(true);
        document.addEventListener('click', handleToolbarClose)
    }
    const handleToolbarClose = (event: MouseEvent) => {
        setIsToolbarVisible(false);
        document.removeEventListener('click', handleToolbarClose);
    }

    return (

        <SlideElementWrapper onClick={handleClick} onContextMenu={handleContextMenu}>

            {renderContent()}
            {isToolbarVisible && (
                <SlideElementToolbar/>
            )}
        </SlideElementWrapper>

    );
};

export default SlideElement;
