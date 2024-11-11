import React, {useEffect, useReducer, useState, DragEvent, useRef} from 'react';


import SlideList from "./components/SlideList/SlideList";
import {useSelector} from "react-redux";
import {addSlide, CourseState} from "../../reducer/courseSlice";
import Column from "../../../../components/Column/Column";
import Row from "../../../../components/Row/Row";
import Scaler from "../../../../components/Scaler/Scaler";
import {EditorItemModel} from "./models/editorItem.model";
import {CourseModel} from "../../models/courseModel";
import {Location, useLocation} from "react-router-dom";
import {CourseSlideModel} from "../../models/courseSlideModel";
import {useAppDispatch} from "../../../../store/store";
import EditorToolbar from "./components/Toolbar/EditorToolbar";


const CourseEditor = () => {
    const location: Location = useLocation();
    const courseInEdit: CourseModel | null = useSelector((state: { course: CourseState }) => state.course.items.find(item => item._id === location?.state.id) ?? null)
    const dispatch = useAppDispatch();
    const [slideInEditIndex, setSlideInEditIndex] = useState<number>(0)
    const [slideInEdit, setSlideInEdit] = useState<CourseSlideModel>();
    useEffect(() => {
        if (courseInEdit) {
            handleSlideChange(slideInEditIndex)
        }
    }, [])

    const handleSlideChange = (index: number) => {
        if (courseInEdit) {
            setSlideInEdit(courseInEdit.slides[index])
            setSlideInEditIndex(index);
        }
    }
    const handleAddSlide = () => {
        if (courseInEdit) {
            dispatch(addSlide({
                courseId: courseInEdit._id,
                slide: {id: 0, title: '', files: [], texts: [], duration: 400}
            }))
        }
    }
    const handleAddImageToSlide = (imgSrc: string) => {
        if (slideInEdit) {
            let slide = {...slideInEdit}
            slide.files = [...slide.files, {id: 's', fileUrl: imgSrc}]
            console.log(slide)
            setSlideInEdit(slide)
        }
    }
    return (
        <Row padding="t4" justifyContent={'center'}>
            <Column size={8}>
                <Row justifyContent={'center'}>
                    <Column size={7}>
                        <div className="editor">
                            <div className="editor-view_wrapper">
                                <div onDragOver={e => e.preventDefault()} className="editor-view">
                                    {slideInEdit?.files.map((file, index) =>
                                        <Scaler key={index}
                                                component={<img
                                                    draggable={false}
                                                    alt="image"
                                                    src={file.fileUrl}
                                                />}/>)}
                                </div>

                            </div>
                            <EditorToolbar handleAddImageToSlide={handleAddImageToSlide}></EditorToolbar>
                        </div>
                    </Column>
                    <Column size={3}>
                        <SlideList handleAddSlide={handleAddSlide} handleSlideChange={handleSlideChange}

                                   slides={courseInEdit?.slides}/>
                    </Column>


                </Row>
            </Column>

        </Row>
    );
};

export default CourseEditor;