import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = (good + neutral + bad)
  const average = (good + ((-1) * bad)) / all || 0
  const positive = (good / all) * 100 || 0
  const handlegoodClick = () =>
    setGood(good + 1)
  const handleneutralClick = () =>
    setNeutral(neutral + 1)
  const handlebadClick = () =>
    setBad(bad + 1)
  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button onClick={handlegoodClick} text="good" />
        <Button onClick={handleneutralClick} text="neutral" />
        <Button onClick={handlebadClick} text="bad" />
      </div>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}
        average={average} positive={positive} all={all} />
    </div>
  )
}

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <tr><StatisticLine text="good" value={props.good} /></tr>
        <tr><StatisticLine text="neutral" value={props.neutral} /></tr>
        <tr><StatisticLine text="bad" value={props.bad} /></tr>
        <tr><StatisticLine text="all" value={props.good + props.neutral + props.bad} /></tr>
        <tr><StatisticLine text="average" value={props.average} /></tr>
        <tr><StatisticLine text="positive" value={props.positive} /><td>%</td></tr>
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <>
        <td>{text}</td><td>{value}</td>
      </>
    )
  }
  return (
    <>
      <td>{text}</td><td>{value}</td>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

