import React from 'react';
import { useDispatch } from 'react-redux'
import { create } from './../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

    
    const dispatch = useDispatch()

    const handleCreate = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value       
        event.target.anecdote.value = ''
        dispatch(create(content))       
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreate}>
                <div>
                    <input name='anecdote' />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
}

export default AnecdoteForm