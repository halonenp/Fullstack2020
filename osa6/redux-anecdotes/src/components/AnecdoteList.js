import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <li>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={handleClick}>vote</button>
                </div>
            </div>
        </li>
    )
}

const AnecdoteList = (props) => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })
    return (
        <ul>
            {anecdotes.sort((x, y) => y.votes - x.votes).map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => {
                        dispatch(vote(anecdote.id, anecdote.content, anecdote.votes))
                        dispatch(setNotification(`Voted on "${anecdote.content}"`, 5))
                    }
                    }
                />
            )}
        </ul>
    )
}

export default AnecdoteList