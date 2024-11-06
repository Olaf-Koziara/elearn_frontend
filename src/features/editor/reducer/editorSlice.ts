import {createSlice} from "@reduxjs/toolkit";
import {EditorModel} from "../models/editor.model";
import {EditorItemModel} from "../models/editorItem.model";
import {v4 as uuid} from "uuid";

const initialState: EditorModel = {
    title: '',
    author: '',
    editorItems: [],
    editingItemIndex: null,
}
export const editorSlice = createSlice({
        name: 'editor',
        initialState: initialState,
        reducers: {
            addItem: (state, {payload}: { payload: EditorItemModel | undefined }) => {
                let item: EditorItemModel;
                if (payload) {
                    item = payload;
                } else {
                    item = {
                        id: uuid(),
                        title: '',
                        files: [],
                        texts: []

                    }
                }
                state.editorItems = [...state.editorItems, item];
                

            },
            removeItem: (state, {payload}: { payload: string }) => {
                state.editorItems = state.editorItems.filter(item => item.id !== payload)
            },
            setEditingItemIndex: (state, {payload}: { payload: number | null }) => {
                state.editingItemIndex = payload;
            }

        }
    }
)

export default editorSlice.reducer;
export const {addItem, removeItem, setEditingItemIndex} = editorSlice.actions;