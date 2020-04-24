import React, { useState } from 'react'


const Blog = ({ blog, removeBlog, user}) => {
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

    return (
        <div style={blogStyle}>
            <div onClick={toggleExpanded()}>
                {blog.title} by {blog.author}
            </div>
            <div style={expand}>
                <div>
                    <a href={blog.url}>{blog.url}</a>
                </div>
                <div>
                    {blog.likes} likes <button >Like</button>
                </div>
                
                <div >
                added by {/*blog.*/user.name}
               
                </div>
                <div >
                    <button onClick={handleRemove}>Remove</button>
                </div>
            </div>

        </div>
    )
}



export default Blog