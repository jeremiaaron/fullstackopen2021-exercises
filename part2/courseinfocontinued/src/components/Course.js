import React from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      {
        parts.map(part =>
          <Part
            key = {part.id}
            name = {part.name}
            exercises = {part.exercises}
          />
        )
      }

      <p><b>Total of {total} exercises</b></p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header text = {course.name} />
      <Content parts = {course.parts} />
    </div>
  )
}

export default Course
