import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EditorItemModel} from "../../models/editorItem.model";
import {addItem, setEditingItemIndex} from "../../reducer/editorSlice";
import './EditorItemsList.scss';
import {fillState} from "../../reducer/editorItemSlice";

const EditorItemsList = () => {
    const editorItems: EditorItemModel[] = useSelector((state: any) => state.editor.editorItems);
    const dispatch = useDispatch();
    const handleItemClick = (index: number) => {
        dispatch(setEditingItemIndex(index));
        dispatch(fillState(editorItems[index]));
    }
    const handleAddItemClick = () => {
        dispatch(addItem())
    }
    return (
        <div className="editor-items-list_wrapper">
            <ul className="editor-items-list list-unstyled">
                {editorItems.map((item, index) => (
                    <li key={item.id} onClick={() => handleItemClick(index)}>
                        <img src={item.files[0]?.fileUrl}/>
                    </li>
                ))}
            </ul>
            <button className="btn editor-items-list_add-button btn-outline-primary" onClick={handleAddItemClick}><i
                className="bi bi-plus-circle-fill"></i> Add item
            </button>

        </div>
    );
};

export default EditorItemsList;