import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Card, CardHeader, CardImage} from "../../../../../../components/Card/style";
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
            {slides?.map((slide, index) => <Card $spacing={'sm'} key={slide.uid}
                                                 onClick={() => handleSlideChange(index)}>
                {slide.title && <CardHeader>{slide.title}</CardHeader>}
                <CardImage $aspectRatio={16 / 9}>
                </CardImage>
            </Card>)}
            <Button onClick={handleAddSlide}>Add slide</Button>
        </SlideListStyled>
    );
};

export default SlideList;