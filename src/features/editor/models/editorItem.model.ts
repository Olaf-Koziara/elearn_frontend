export interface EditorItemModel {
    id: string;
    title: string;
    files: Array<EditorItemFileModel>;
    texts: Array<EditorItemTextModel>;


}

export interface EditorItemTextModel {
    id: string;
    content: string,
    fontSize: string,
    positionX: string,
    positionY: string
}

export interface EditorItemFileModel {
    id: string;
    fileUrl: string;

}