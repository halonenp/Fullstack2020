import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const all = store.getState().good + store.getState().ok + store.getState().bad
  const average = (store.getState().good + ((-1) * store.getState().bad)) / all || 0
  const positive = (store.getState().good / all) * 100 || 0

  return (
    <div>
      <button onClick={good}>
        hyvä
        </button>
      <button onClick={ok}>
        neutraali
        </button>
      <button onClick={bad}>
        huono
        </button>
      <button onClick={zero}>
        nollaa
        </button>
      <h3>statistics</h3>
      {all !== 0 ? <>
        <div>hyvä {store.getState().good}</div>
        <div>neutraali {store.getState().ok}</div>
        <div>huono {store.getState().bad}</div>
        <div>keskiarvo {average}</div>
        <div>positiiviset {positive}%</div>
      </> :
        <div>no feedback given </div>}
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
