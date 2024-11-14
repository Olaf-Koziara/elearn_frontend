import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Card, CardImage, CardHeader, CardText} from '../../../../components/Card/style';
import {useAppDispatch} from "../../../../store/store";
import {getCourseById, getCourses} from "../../actions/courseActions";
import {CourseListStyled} from "./style";
import Row from "../../../../components/Row/Row";
import Button from "../../../../components/Button/Button";
import Column from "../../../../components/Column/Column";

interface CourseModel {
    _id?: string;
    title: string;
    description: string;
    thumbnail?: string;
    author: string;
    createdAt: string;
    slides: CourseSlideModel[];
}

interface CourseSlideModel {
    // Zakładam, że CourseSlideModel ma jakieś właściwości, ale tutaj ich nie opisuję.
}


const CourseList = () => {
    const {items} = useSelector((state: { course: { items: CourseModel[] } }) => state.course);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCourses())
    }, [])

    return (
        <Row padding='t4' justifyContent={'center'}>
            <Column size={8}>
                <Link to='/courses/add'><Button>Dodaj kurs</Button></Link>

                {items.length === 0 ? (
                    <p>Brak dostępnych kursów.</p>
                ) : (

                    <CourseListStyled>

                        {items.map((course) => (

                            <Card key={course._id}>
                                <Link to="/courses/edit"
                                      state={{id: course._id}}>
                                    {course.thumbnail &&
                                        <CardImage $aspectRatio={16 / 9}>
                                            <img src={course.thumbnail} alt={course.title}
                                                 className="course-thumbnail"/>
                                        </CardImage>}
                                    <CardHeader>{course.title}</CardHeader>
                                    <CardText>Data utworzenia: {new Date(course.createdAt).toLocaleDateString()}

                                    </CardText>
                                </Link>

                            </Card>

                        ))}

                    </CourseListStyled>


                )}
            </Column>
        </Row>
    );
};

export default CourseList;
