import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

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
    return (
        <div>
            <Link to='/courses/edit'>Dodaj kurs</Link>

            {items.length === 0 ? (
                <p>Brak dostępnych kursów.</p>
            ) : (
                <div className="course-list">
                    {items.map((course) => (
                        <div key={course._id} className="course-item">
                            {course.thumbnail &&
                                <img src={course.thumbnail} alt={course.title} className="course-thumbnail"/>}
                            <div className="course-info">
                                <h3>{course.title}</h3>
                                <p>Data utworzenia: {new Date(course.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseList;
