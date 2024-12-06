import React, {useContext} from 'react';
import {ToolbarWrapper} from './style';
import {SlideElementContext} from "../../SlideElement";
import TextEditor from "../../../TextEditor/TextEditor";
import {CourseSlideElement, CourseSlideElementTextModel} from "../../../../../../models/courseSlideModel";

const SlideElementToolbar = () => {
    const element = useContext(SlideElementContext)
    return (
        <ToolbarWrapper onClick={(e) => e.stopPropagation()}>
            {element?.type === 'text' && <TextEditor/>}
        </ToolbarWrapper>
    );
};

export default SlideElementToolbar;