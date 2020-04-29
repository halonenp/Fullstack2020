import React, { useState } from 'react'


const Blog = ({ blog, removeBlog, addLike}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
    const [expanded, setExpanded] = useState(false)

    const expand = { display: expanded ? '' : 'none' }
    
    const toggleExpanded = () => () => {
        setExpanded(!expanded)
    }

    const handleRemove = async (event) => {
        event.preventDefault()
        await removeBlog(blog)
    }

    const handleLike = async (event) => {
        event.preventDefault()
        await addLike()
       
        
    }

    return (
        <div style={blogStyle}>
            <div id='expand' onClick={toggleExpanded()} className="toggleB">
                {blog.title} by {blog.author}
            </div>
            <div style={expand}>
                <div>
                    <a href={blog.url}>{blog.url}</a>
                </div>
                <div className="likeB">
                {blog.likes} likes <button onClick={handleLike}>Like</button>
                </div>
                
                <div>
               added by {/*blog.user.name*/}
               
                </div>
                <div id='remov'>
                    <button  onClick={handleRemove}>Remove</button>
                </div>
            </div>

        </div>
    )
}



export default Blog