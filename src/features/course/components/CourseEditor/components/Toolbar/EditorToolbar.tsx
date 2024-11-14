import React, {ChangeEvent, useState} from 'react';
import './EditorToolbar.scss';
import {uid} from 'uid';
import TextEditor from '../TextEditor/TextEditor';
import {EditorToolbarLeftSide, EditorToolbarRightSide, EditorToolbarWrapper} from './style';
import {RelativeWrapper} from '../../../../../../components/global/style';
import {Dropdown, Modal} from '../../../../../../components/global';
import {
    CourseSlideElement,
    CourseSlideElementImageModel,
    CourseSlideElementModel
} from "../../../../models/courseSlideModel";
import FormField from "../../../../../../components/FormField/FormField";
import Button from "../../../../../../components/Button/Button";

interface EditorToolbarProps {
    handleAddElementToSlide: (item: CourseSlideElement) => void;
    handleCourseSave: () => void;
    handleCourseDelete?: (courseId?: string) => void;
}

const EditorToolbar = ({handleAddElementToSlide, handleCourseSave, handleCourseDelete}: EditorToolbarProps) => {


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
            handleAddElementToSlide(imageItem);
        }
    };


    return (
        <EditorToolbarWrapper>
            <EditorToolbarLeftSide>

                <Dropdown label={<i className="bi bi-plus-circle-fill"/>} direction="up">
                    <FormField type="file" name="fileInput" onChange={handleFileChange}><i
                        className="bi bi-image"/></FormField>
                </Dropdown>
                <Dropdown label={<i className="bi bi-fonts"/>} direction='up'>
                    <div className="editor-toolbar-texteditor_modal">
                        <TextEditor handleAddElementToSlide={handleAddElementToSlide}/>
                    </div>
                </Dropdown>

            </EditorToolbarLeftSide>
            <EditorToolbarRightSide>
                <Button onClick={handleCourseSave}>Save</Button>

                <Modal onConfirmation={handleCourseDelete} label={<Button>Delete</Button>}>
                    <h4>Confirm course delete</h4>
                </Modal>
            </EditorToolbarRightSide>
        </EditorToolbarWrapper>
    );
};

export default EditorToolbar;
