import {EditorItemModel} from "./editorItem.model";

export interface EditorModel {
    title: string;
    author: string;
    editorItems: EditorItemModel[];
    editingItemIndex: number | null;

}