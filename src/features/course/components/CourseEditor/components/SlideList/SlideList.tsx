import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Card, CardHeader} from "../../../../../../components/Card/style";
import {CourseSlideModel} from "../../../../models/courseSlideModel";
import Button from "../../../../../../components/Button/Button";
import {SlideListStyled} from "./style";


const SlideList = ({
                       slides,
                       handleAddSlide,
                       handleSlideChange
                   }: { slides?: CourseSlideModel[], handleAddSlide: () => void, handleSlideChange: (index: number) => void }) => {

    const dispatch = useDispatch();


    return (
        <SlideListStyled>
            {slides?.map((slide, index) => <Card key={slide.id} onClick={() => handleSlideChange(index)}>
                <CardHeader>{slide.title}</CardHeader>
            </Card>)}
            <Button onClick={handleAddSlide}>Add slide</Button>
        </SlideListStyled>
    );
};

export default SlideList;