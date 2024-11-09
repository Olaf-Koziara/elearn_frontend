export interface CourseSlideModel {
    id: string;
    title: string;
    files: Array<CourseSlideFileModel>;
    texts: Array<CourseSlideTextModel>;
    duration: number;


}

export interface CourseSlideTextModel {
    id: string;
    content: string,
    fontSize: string,
    positionX: string,
    positionY: string
}

export interface CourseSlideFileModel {
    id: string;
    fileUrl: string;

}