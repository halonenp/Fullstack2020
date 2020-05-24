import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { Table, Form, Button } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      setUser(user)
      dispatch(setNotification(`${user.name} welcome back!`, 5))
      storage.saveUser(user)
    } catch (exception) {
      dispatch(setNotification('wrong username/password', 5))

    }
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      dispatch(setNotification(`a new blog "${blog.title}" added`, 5))
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    setBlogs(blogs.map(b => b.id === id ? { ...blogToLike, likes: blogToLike.likes + 1 } : b))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  if (!user) {
    return (
      <div className="container">
        <h2>login to application</h2>
        <Notification />
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <div>
              <Form.Label>username:</Form.Label>
              <Form.Control
                type="text"
                id='username'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <Form.Label>password:</Form.Label>
              <Form.Control
                type="password"
                id='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button variant="outline-primary" id='login' type="submit">login</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div className="container">
      <h2>blogs</h2>
      <Notification />
      {user.name} logged in <Button variant="outline-secondary" onClick={handleLogout}>logout</Button>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <Table striped hover bordered variant="dark" size="sm">
        <tbody>
          {blogs.sort(byLikes).map(blog =>
          <tr key={blog.id}>
            <td>
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleRemove={handleRemove}
              own={true}
            />
            </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default App