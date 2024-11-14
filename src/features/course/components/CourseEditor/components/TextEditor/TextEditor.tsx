import React, {useState} from 'react';
import {EditorContainer} from './style';

import {uid} from "uid";
import {CourseSlideElementModel, CourseSlideElementTextModel} from "../../../../models/courseSlideModel";
import FormField from "../../../../../../components/FormField/FormField";


interface TextEditorProps {
    handleAddElementToSlide: (item: CourseSlideElementTextModel) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({handleAddElementToSlide}) => {
    const [textContent, setTextContent] = useState<string>('New Text');
    const [textColor, setTextColor] = useState<string>('#000000');
    const [fontSize, setFontSize] = useState<string>('16px');
    const [fontFamily, setFontFamily] = useState<string>('Arial');

    const handleAddText = () => {

        const textItem: CourseSlideElementTextModel = {
            type: 'text',
            uid: uid(),
            position: {x: 0, y: 0},
            size: {width: 200, height: 50},
            content: textContent,
            fontSize,
            fontFamily,
            color: textColor
        };

        handleAddElementToSlide(textItem);
    };

    return (
        <EditorContainer>
            <label>
                Text Content:
                <input
                    type="text"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                />
            </label>
            <label>
                Text Color:
                <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
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
            <button onClick={handleAddText}>Add Text</button>
        </EditorContainer>
    );
};


export default TextEditor;
