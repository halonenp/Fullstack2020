import React, { useState } from 'react'



const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    
    

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: 0,
            
        })
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
        
        
    }

    return (
        <div>
            <h2>create new</h2>
            
            <form onSubmit={addBlog} >
                <div>
                    title: <input value={newTitle}
                        onChange={handleTitleChange} />
                </div>
                <div>
                    author: <input value={newAuthor}
                        onChange={handleAuthorChange} />
                </div>
                <div>
                    url: <input value={newUrl}
                        onChange={handleUrlChange} />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
}


export default BlogForm