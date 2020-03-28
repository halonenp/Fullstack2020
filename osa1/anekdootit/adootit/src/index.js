import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * 6))
  const handlerandomClick = () =>
    setSelected(Math.floor(Math.random() * 6))
  const handlevoteClick = () => {
    copy[selected] += 1
    setPoints(copy)
  }
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])
  const copy = [...points]
  const mostVotes = Math.max(...copy)
  const index = copy.indexOf(Math.max(...copy));


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>
        <div>has {copy[selected]} votes</div>
        <Vote onClick={handlevoteClick} text="Vote" />
        <Button onClick={handlerandomClick} text="Next Anecdote" />
        <h1>Anecdote with most votes</h1>
        {props.anecdotes[index]}
        <div>has {mostVotes} vote</div>
      </div>
    </div>
  )
}
const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)
const Vote = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)