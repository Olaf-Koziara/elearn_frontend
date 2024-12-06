import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from "../../../../../../components/Button/Button";
import {SlideListStyled} from "./style";
import {useAppDispatch} from "../../../../../../store/store";
import {addSlide, CourseState, setSlideInEditIndex} from "../../../../reducer/courseSlice";
import {Card, CardHeader, CardImage} from '../../../../../../components/global/style';


const SlideList = () => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0)
    const slides = useSelector((state: { course: CourseState }) => state.course.courseInEdit?.slides);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(addSlide())
        handleSlideChange(0)
    }, [])
    const handleClickOnSlide = (index: number) => {
        handleSlideChange(index)
        setActiveSlideIndex(index)
    }
    const handleSlideChange = (index: number) => {
        dispatch(setSlideInEditIndex(index))
    }
    const handleAddSlide = () => dispatch(addSlide());

    return (
        <>
            <SlideListStyled>
                {slides?.map((slide, index) => <li key={slide.uid}><Card $spacing={'sm'}
                                                                         $active={activeSlideIndex === index}
                                                                         onClick={() => handleClickOnSlide(index)}>
                    {slide.title && <CardHeader>{slide.title}</CardHeader>}

                    <CardImage $aspectRatio={16 / 9}>
                    </CardImage>
                </Card></li>)}

            </SlideListStyled>
            <Button onClick={handleAddSlide}>Add slide</Button>
        </>
    );
};

export default SlideList;