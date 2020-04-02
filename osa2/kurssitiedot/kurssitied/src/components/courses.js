import React from 'react'

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    const total = course.parts.reduce(
        (prevValue, currentValue) => prevValue + currentValue.exercises,
        0
    );
    return <p>total of {total} exercises</p>;
};

const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map((part, i) =>
                <Part key={i} part={part} />
            )}
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <b><ul><Total course={course} /></ul></b>
        </div>
    )
}

export default Course
