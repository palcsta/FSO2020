import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import axios from 'axios'
import Notification from './components/Notification'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const loginService = async credentials => {
    const response = await axios.post("/api/login", credentials)
    console.log('response------', response)
    console.log('response data:-----', response.data)
    return response.data
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
            <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
            <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={handleNewBlog}>
      <div>
        title
          <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
         <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )

  const handleNewBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: author,
      title: title,
      url: url,

    }
    try {
      blogService
        .create(blogObject)
      .then(returned => {
        setBlogs(blogs.concat(returned))

      })

      setSuccessMessage('Successfully added blog: '+title)

      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (e) {
      console.log('error in adding blog: ',e)
      setErrorMessage("adding blog failed")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }



    setTitle("")
    setAuthor('')
    setUrl("")


  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
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

  const logout = () => {
    // event.preventDefault()

    //window.localStorage.removeItem('loggedUser')
    //or more powerful: 
    setUser(null)
    setUsername('')
    setPassword('')
    window.localStorage.clear()
  }
  //const logout2 = window.localStorage.removeItem('loggedUser')


  if (user === null) {
    return (
      <div>

        <h2>Log in to application</h2>

        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }



  return (
    <div>
      <h2>BLOGS</h2>

      <p>User <b>{user.name}</b> logged in <button onClick={logout}>log out</button></p>
      <Notification message={successMessage} />

      {blogForm()}


      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App