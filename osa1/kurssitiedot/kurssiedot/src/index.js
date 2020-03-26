import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content exercises1 = {exercises1} part1 = {part1} 
                exercises2 = {exercises2} part2 = {part2} 
                exercises3 = {exercises3} part3 = {part3} />
      <Total exercises1 = {exercises1} exercises2 = {exercises2} 
              exercises3 = {exercises3} />


    </div>
  )
}

const Header = (muuttuja) => {
  return (
    <div>
      <h1>{muuttuja.course}</h1>
    </div>
  )
}

const Content = (muuttuja) => {
  return(
    <div>
      <p>{muuttuja.part1} {muuttuja.exercises1}</p>
      <p>{muuttuja.part2} {muuttuja.exercises2}</p>
      <p>{muuttuja.part3} {muuttuja.exercises3}</p>
      
    </div>
  )

}

const Total = (props) => {
  return(
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))