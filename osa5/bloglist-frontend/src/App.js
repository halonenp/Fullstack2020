import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import './App.css'
import Message from './components/Message'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const noteFormRef = React.createRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )
  
  const addLike = async () => {
    console.log('liked')
}
  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
      setMessage('a new blog added')
        setTimeout(() => {
            setMessage(null)
        }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable id='new-blog' buttonLabel='new blog' ref={noteFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )
 
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
           id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )


const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
        try {
            await blogService.remove(blog.id)
            setBlogs(blogs.filter(x => x.id !== blog.id))
        } catch (exception) {
          setErrorMessage('Cannot remove')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
    }
}


  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in {logoutForm()}</div>
      <div>
      <Notification message={errorMessage} />
      <Message message={message} />
        {blogForm()}
      </div>
      {blogs.sort((x, y) => y.likes - x.likes).map(blog =>
        <Blog key={blog.id} blog={blog}  removeBlog={() => removeBlog(blog)} user={user} addLike={() => addLike()} />)}
    </div>
  )
}

export default App