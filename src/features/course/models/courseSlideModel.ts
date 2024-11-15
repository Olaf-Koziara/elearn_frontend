export interface CourseSlideModel {
    uid: string;
    title: string;
    elements: Array<CourseSlideElementImageModel | CourseSlideElementTextModel>; //
    duration: number;
}

export interface CourseSlideElementModel {
    uid: string;
    type: 'image' | 'text'
    position: { x: number; y: number };
    size: { width: number; height: number };

}

export interface CourseSlideElementTextModel extends CourseSlideElementModel {
    content: string,
    fontSize: string,
    fontFamily: string,
    color: string
}

export interface CourseSlideElementImageModel extends CourseSlideElementModel {
    isUploaded?: boolean
    url: string

}

export type CourseSlideElement = CourseSlideElementTextModel | CourseSlideElementImageModel;