import React, {useEffect, useState, DragEvent, useRef} from 'react';
import {useSelector} from 'react-redux';
import {CourseState, updateSlideElementProperties} from '../../reducer/courseSlice';
import Column from '../../../../components/Column/Column';
import Row from '../../../../components/Row/Row';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch} from '../../../../store/store';
import EditorToolbar from './components/Toolbar/EditorToolbar';
import {CourseEditorWorkspace} from './style';
import Draggable from '../../../../components/Draggable/Draggable';
import SlideList from "./components/SlideList/SlideList";
import SlideElement from "./components/SlideElement/SlideElement";
import {getCourseById,} from "../../actions/courseActions";
import Loader from "../../../../components/Loader/Loader";

const CourseEditor = () => {
    const params = useParams();
    const {courseInEdit, slideInEditIndex, loading} = useSelector((state: { course: CourseState }) => state.course);
    const dispatch = useAppDispatch();
    const editorWorkspaceRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        params.id && dispatch(getCourseById(params.id))
    }, []);


    const handleItemPropertiesChange = (
        uid: string,
        properties: {}
    ) => {
        dispatch(updateSlideElementProperties({uid, properties}));
    };


    return (
        <Row padding="t4" justifyContent="center">
            <Loader isLoading={loading}/>
            <Column size={8}>
                <Row justifyContent="center">
                    <Column size={8}>
                        <div className="editor">
                            <div className="editor-view_wrapper">
                                <CourseEditorWorkspace
                                    ref={editorWorkspaceRef}
                                    onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}>
                                    {courseInEdit?.slides[slideInEditIndex]?.elements.map((element, index) => (
                                        <Draggable
                                            key={element.uid ?? index}
                                            initialPosition={element.position}
                                            initialSize={element.size}
                                            onPositionChange={(position) => handleItemPropertiesChange(element.uid, {position})}
                                            onSizeChange={(size) => handleItemPropertiesChange(element.uid, {size})}
                                            resizeable={element.type === 'image'}
                                            parentRef={editorWorkspaceRef}
                                        >
                                            <SlideElement element={element}/>
                                        </Draggable>
                                    ))}
                                </CourseEditorWorkspace>

                            </div>
                            <EditorToolbar/>
                        </div>
                    </Column>
                    <Column size={2}>
                        <SlideList/>
                    </Column>
                </Row>
            </Column>
        </Row>
    );
};

export default CourseEditor;
