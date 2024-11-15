import React, {useEffect, useState, DragEvent, useRef} from 'react';
import {useSelector} from 'react-redux';
import {addSlide, CourseState, updateSlide} from '../../reducer/courseSlice';
import Column from '../../../../components/Column/Column';
import Row from '../../../../components/Row/Row';
import {CourseModel} from '../../models/courseModel';
import {Location, useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../../../store/store';
import EditorToolbar from './components/Toolbar/EditorToolbar';
import {CourseEditorWorkspace} from './style';
import {uid} from 'uid';
import Draggable from '../../../../components/Draggable/Draggable';
import SlideList from "./components/SlideList/SlideList";
import {
    CourseSlideElementImageModel,
    CourseSlideElementModel,
    CourseSlideElementTextModel,
    CourseSlideModel
} from "../../models/courseSlideModel";
import SlideElement from "./components/SlideElement/SlideElement";
import {
    deleteCourseById,
    FileUploadResponse,
    getCourseById,
    saveCourse,
    UploadFile,
    uploadFilesWithIds
} from "../../actions/courseActions";
import {set} from "react-hook-form";

const CourseEditor = () => {
    const location: Location = useLocation();
    const navigate = useNavigate();
    const courseInEdit: CourseModel | null = useSelector((state: { course: CourseState }) =>
        state.course.items.find((item) => item._id === location?.state.id) ?? null
    );
    const dispatch = useAppDispatch();
    const [slideInEditIndex, setSlideInEditIndex] = useState<number>(0);
    const [isChangingSlide, setIsChangingSlide] = useState(false);
    const [slideInEdit, setSlideInEdit] = useState<CourseSlideModel | undefined>();
    const editorWorkspaceRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (courseInEdit) {
            dispatch(getCourseById(courseInEdit._id)).then(() => {
                setSlideInEdit(courseInEdit.slides[slideInEditIndex]);
                setIsChangingSlide(true);
            })


        }
    }, []);

    useEffect(() => {
        if (isChangingSlide) {
            setIsChangingSlide(false);
            return;
        }
        if (courseInEdit && slideInEdit) {
            dispatch(updateSlide({slide: slideInEdit, courseId: courseInEdit._id}));
        }
    }, [slideInEdit]);

    const handleSlideChange = (index: number) => {
        if (courseInEdit) {
            setSlideInEdit(courseInEdit.slides[index]);
            setSlideInEditIndex(index);
            setIsChangingSlide(true);
        }
    };

    const handleAddSlide = () => {
        if (courseInEdit) {
            dispatch(
                addSlide({
                    courseId: courseInEdit._id,
                    slide: {uid: uid(), title: '', elements: [], duration: 400},
                })
            );
        }
    };

    const handleAddElementToSlide = (
        item: CourseSlideElementTextModel | CourseSlideElementImageModel
    ) => {
        if (slideInEdit) {
            const updatedSlide = {
                ...slideInEdit,
                elements: [...slideInEdit.elements, item],
            };
            setSlideInEdit(updatedSlide);
        }
    };


    const handleItemPropertiesChange = (
        id: string,
        position?: CourseSlideElementModel['position'],
        size?: CourseSlideElementModel['size']
    ) => {
        if (slideInEdit) {
            const updatedItems = slideInEdit.elements.map((element) => {
                if (element.uid === id) {
                    return {
                        ...element,
                        ...(position && {position}),
                        ...(size && {size}),
                    };
                }
                return element;
            });

            const updatedSlide = {
                ...slideInEdit,
                elements: updatedItems,
            };

            setSlideInEdit(updatedSlide);
        }
    };
    const handleCourseSave = async () => {
        if (courseInEdit) {
            await saveCourse(courseInEdit)
        }
    }
    const handleCourseDelete = (courseId: string) => {
        dispatch(deleteCourseById(courseId));
        navigate('/courses')

    }

    return (
        <Row padding="t4" justifyContent="center">
            <Column size={8}>
                <Row justifyContent="center">
                    <Column size={8}>
                        <div className="editor">
                            <div className="editor-view_wrapper">
                                <CourseEditorWorkspace
                                    ref={editorWorkspaceRef}
                                    onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}>
                                    {slideInEdit?.elements && slideInEdit.elements.map((element) => (
                                        <Draggable
                                            key={element.uid}
                                            id={element.uid}
                                            initialPosition={element.position}
                                            initialSize={element.size}
                                            onPositionChange={(position) => handleItemPropertiesChange(element.uid, position)}
                                            onSizeChange={(size) => handleItemPropertiesChange(element.uid, undefined, size)}
                                            resizeable={element.type === 'image'}
                                            parentRef={editorWorkspaceRef}
                                        >
                                            <SlideElement element={element}/>
                                        </Draggable>
                                    ))}
                                </CourseEditorWorkspace>

                            </div>
                            <EditorToolbar
                                handleAddElementToSlide={handleAddElementToSlide}
                                handleCourseSave={handleCourseSave}
                                handleCourseDelete={courseInEdit ? () => handleCourseDelete(courseInEdit?._id) : undefined}

                            />
                        </div>
                    </Column>
                    <Column size={2}>
                        <SlideList
                            handleAddSlide={handleAddSlide}
                            handleSlideChange={handleSlideChange}
                            slides={courseInEdit?.slides}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>
    );
};

export default CourseEditor;
