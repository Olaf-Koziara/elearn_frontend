import React, {useEffect, useReducer, useState, DragEvent, useRef} from 'react';
import EditorToolbar from "./components/EditorToolbar/EditorToolbar";
import './Editor.scss';
import EditorItemsList from "./components/EditorItemsList/EditorItemsList";
import {useDispatch, useSelector} from "react-redux";
import {EditorItemModel} from "./models/editorItem.model";
import Scaler from "../../components/Scaler/Scaler";


const Editor = () => {
    const [dragged, setDragged] = useState<number>(0);
    const dispatch = useDispatch();
    const editorItem: EditorItemModel = useSelector((state: any) => state.editorItem);

    return (
        <div className="editor">
            <div className="editor-view_wrapper">
                <div onDragOver={e => e.preventDefault()} className="editor-view">
                    {editorItem?.files.map((file, index) => <Scaler key={index}
                                                                    component={<img
                                                                        draggable={false}
                                                                        alt="image"
                                                                        src={file.fileUrl}
                                                                    />}/>)}
                </div>

                <EditorToolbar/>
            </div>
            <EditorItemsList/>

        </div>

    );
};

export default Editor;