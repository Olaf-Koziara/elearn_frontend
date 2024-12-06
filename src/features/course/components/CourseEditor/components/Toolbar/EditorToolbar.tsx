import React, {ChangeEvent, useState} from 'react';
import './EditorToolbar.scss';
import {uid} from 'uid';
import TextEditor from '../TextEditor/TextEditor';
import {EditorToolbarLeftSide, EditorToolbarRightSide, EditorToolbarWrapper} from './style';
import {Dropdown} from '../../../../../../components/global';
import {CourseSlideElementImageModel} from "../../../../models/courseSlideModel";
import FormField from "../../../../../../components/FormField/FormField";
import Button from "../../../../../../components/Button/Button";
import {deleteCourseById, saveCourse} from "../../../../actions/courseActions";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../../../../store/store";
import {addElementToSlide, CourseState} from "../../../../reducer/courseSlice";
import {useSelector} from "react-redux";


const EditorToolbar = () => {
    const navigate = useNavigate();
    const {courseInEdit, loading} = useSelector((state: { course: CourseState }) => state.course);
    const dispatch = useAppDispatch();
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = (e.target as HTMLInputElement).files?.item(0);
        if (file) {
            const fileUrl = window.URL.createObjectURL(file);
            const imageItem: CourseSlideElementImageModel = {
                type: 'image',
                uid: uid(),
                position: {x: 0, y: 0},
                size: {width: 200, height: 200}, // Domyślny rozmiar obrazu
                url: fileUrl
            };
            dispatch(addElementToSlide(imageItem));
        }
    };
    const handleCourseSave = () => dispatch(saveCourse())
    const handleCourseDelete = () => {
        if (window.confirm('Confirm course delete')) {
            courseInEdit?._id && dispatch(deleteCourseById(courseInEdit?._id));
            navigate('/courses')
        }

    }

    return (
        <EditorToolbarWrapper>
            <EditorToolbarLeftSide>

                <Dropdown label={<i className="bi bi-plus-circle-fill"/>} direction="up">
                    <FormField type="file" name="fileInput" onChange={handleFileChange}><i
                        className="bi bi-image"/></FormField>
                </Dropdown>
                <Dropdown label={<i className="bi bi-fonts"/>} direction='up'>
                    <div className="editor-toolbar-texteditor_modal">
                        <TextEditor/>
                    </div>
                </Dropdown>

            </EditorToolbarLeftSide>
            <EditorToolbarRightSide>
                <Button onClick={handleCourseSave}>Save</Button>
                <Button onClick={handleCourseDelete}>Delete</Button>

            </EditorToolbarRightSide>
        </EditorToolbarWrapper>
    );
};

export default EditorToolbar;
