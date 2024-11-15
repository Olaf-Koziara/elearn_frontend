import {createSlice} from "@reduxjs/toolkit";
import {EditorItemFileModel, EditorItemModel, EditorItemTextModel} from "../models/editorItem.model";
import {v4 as uuid} from "uuid";

const initialState: EditorItemModel = {id: '', title: '', texts: [], files: []}
const editorItemSlice = createSlice({
        name: "editorItem",
        initialState: initialState,
        reducers: {
            addFile(state, {payload}: { payload: string }) {
                const editorItemFile: EditorItemFileModel = {id: uuid(), fileUrl: payload};
                state.files.push(editorItemFile);
            },
            removeFile(state, {payload}: { payload: EditorItemModel }) {
                state.files = state.files.filter(file => file.id !== payload.id);
            },
            addText(state, {payload}: { payload: EditorItemTextModel }) {
                payload.id = uuid();
                state.texts.push(payload);
            },
            removeText(state, {payload}: { payload: EditorItemTextModel }) {
                state.texts = state.texts.filter(text => text.id !== payload.id);
            },
            fillState(state, {payload}: { payload: EditorItemModel }) {
                state.id = payload.id;
                state.title = payload.title;
                state.texts = payload.texts;
                state.files = payload.files;

            }
        }
    }
)
export const {addFile, removeFile, addText, removeText, fillState} = editorItemSlice.actions;
export default editorItemSlice.reducer;