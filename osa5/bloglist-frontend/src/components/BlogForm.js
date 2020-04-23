import React from 'react'

const BlogForm = ({ newTitle, newAuthor, newUrl, handleAuthorChange, handleTitleChange, handleUrlChange }) => {

    return (

        <div>
            <h2>create new</h2>
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
        </div>
    )
}

export default BlogForm