import React, {ChangeEvent, useState} from 'react';
import './EditorToolbar.scss';
import {useDispatch, useSelector} from "react-redux";
import {addFile} from "../../reducer/editorItemSlice";

const EditorToolbar = () => {
    const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false)
    const files = useSelector((state: any) => state.editorItem.files);
    const dispatch = useDispatch();
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = (e.target as HTMLInputElement).files?.item(0);
        if (file) {
            const fileUrl = window.URL.createObjectURL(file);
            dispatch(addFile(fileUrl));
        }
    }
    return (
        <div className='editor-toolbar'>
            <div className='editor-toolbar-add'>
                <button onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
                        className='editor-toolbar-add_button btn'><i className="bi bi-plus-circle-fill"/></button>
                <ul className={`editor-toolbar-add_dropdown list-unstyled ${isAddDropdownOpen ? 'open' : ''}`}>
                    <li>
                        <label htmlFor="fileInput"><i className="bi bi-image"></i></label>

                        <input name="fileInput" type='file' onChange={handleFileChange}/>
                    </li>


                </ul>

            </div>
            <button className='editor-toolbar-text_button btn'><i className="bi bi-fonts"></i>
            </button>
        </div>
    );
};

export default EditorToolbar;