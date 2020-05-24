import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {  Button } from 'react-bootstrap'

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = visible ? 'hide' : 'view'

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author} <Button size="sm" variant="outline-light" onClick={() => setVisible(!visible)}>{label}</Button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <Button variant="outline-light" onClick={() => handleLike(blog.id)}>like</Button>
          </div>
          <div>{blog.user.name}</div>
          {own && <Button variant="outline-light" onClick={() => handleRemove(blog.id)}>remove</Button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog
