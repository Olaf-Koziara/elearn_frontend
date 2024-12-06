import React, {useContext, useEffect, useState} from 'react';
import {EditorContainer} from './style';
import {uid} from "uid";
import {CourseSlideElementTextModel} from "../../../../models/courseSlideModel";
import FormField from "../../../../../../components/FormField/FormField";
import {SlideElementContext} from "../SlideElement/SlideElement";
import {useAppDispatch} from "../../../../../../store/store";
import {addElementToSlide, updateSlideElementProperties} from "../../../../reducer/courseSlice";


interface TextEditorProps {
    handleAddElementToSlide?: (text: TextEditorModel) => void;
}

interface TextEditorModel {
    content: string;
    fontSize: string;
    fontFamily: string;
    color: string;
}

const TextEditor: React.FC<TextEditorProps> = ({handleAddElementToSlide}) => {
    const textElement = useContext(SlideElementContext) as CourseSlideElementTextModel;
    const [textElementInitial, setTextElementInitial] = useState(textElement);
    const dispatch = useAppDispatch();
    const [content, setContent] = useState<string>(textElement ? textElement.content : 'New Text');
    const [color, setColor] = useState<string>(textElement ? textElement.color : '#000000');
    const [fontSize, setFontSize] = useState<string>(textElement ? textElement.fontSize : '16px');
    const [fontFamily, setFontFamily] = useState<string>(textElement ? textElement.fontFamily : 'Arial');

    useEffect(() => {
        if (textElement) {
            dispatch(updateSlideElementProperties({
                uid: textElement.uid,
                properties: {content, color, fontSize, fontFamily}
            }))
        }
    }, [content, color, fontSize, fontFamily])

    const handleAddTextElement = () => {
        const textElement: CourseSlideElementTextModel = {
            uid: uid(),
            type: 'text',
            content,
            fontSize,
            fontFamily,
            color,

        };
        dispatch(addElementToSlide(textElement))
    };
    const handleTextChange = () => {

    }


    return (
        <EditorContainer>
            <label>
                Text Content:
                <FormField
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </label>
            <label>
                Text Color:
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </label>
            <label>
                Font Size:
                <FormField
                    type="number"
                    min="10"
                    max="100"
                    value={parseInt(fontSize)}
                    onChange={(e) => setFontSize(`${e.target.value}px`)}
                />
            </label>
            <label>
                Font Family:
                <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                >
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                </select>
            </label>
            {textElement ? <button onClick={handleTextChange}>Save</button> :
                <button onClick={handleAddTextElement}>Add Text</button>}
        </EditorContainer>
    );
};


export default TextEditor;
