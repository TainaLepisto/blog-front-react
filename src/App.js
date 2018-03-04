import React from 'react'

import Blog from './components/Blog'
import Info from './components/Info'
import LoginForm from './components/LoginForm'
import AddNewBlog from './components/AddNewBlog'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: '',
      success: '',
      info: '',
      username: '',
      password: '',
      user: '',
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: '',
      newBlogForm: ''
    }
  }

  componentDidMount = async () => {
    const blogs = await blogService.getAll()
    this.setState({ blogs })

    //console.log('componentDidMount')
    //console.log(this.state.blogs)

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    //console.log(loggedUserJSON)

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      this.setState({ user })
    }
  }

  login = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      console.log('login')
      console.log(JSON.stringify(user))

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })

    } catch (exception) {
      this.setState({
        error: 'invalid username or password',
      })
      setTimeout(() => {
        this.setState({ error: '' })
      }, 5000)
    }
  }


  logout = () => {
    window.localStorage.clear()
    blogService.setToken('')
    this.setState({
      username: '',
      password: '',
      user: '',
      success: 'you are logged out'
    })
    setTimeout(() => {
      this.setState({ success: '' })
    }, 5000)
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  createNewBlog = async (event) => {
    event.preventDefault()

    try {
      const blogObject = {
        title: this.state.newBlogTitle,
        author: this.state.newBlogAuthor,
        url: this.state.newBlogUrl
      }

      const saveBlog = await blogService.create(blogObject)

      this.setState({
        blogs: this.state.blogs.concat(saveBlog),
        newBlogTitle: '',
        newBlogAuthor: '',
        newBlogUrl: '',
        success: 'blog successfully created'
      })

      this.newBlogForm.toggleVisibility()

      setTimeout(() => {
        this.setState({ success: '' })
      }, 5000)

    } catch (exception) {
      console.log(exception)
      this.setState({
        error: 'something went wrong and blog is not saved'
      })
      setTimeout(() => {
        this.setState({ error: '' })
      }, 5000)
    }

  }

  afterLogin = () => (
    <div>
      <p>{this.state.user.name} logged in</p>
      <button onClick={() => this.logout()}>
        Logout
      </button>
      <br /><br />
      <Togglable buttonLabel="create new" ref={component => this.newBlogForm = component}>
        <AddNewBlog
          onSubmit={this.createNewBlog}
          valueTitle={this.state.newBlogTitle}
          valueAuthor={this.state.newBlogAuthor}
          valueUrl={this.state.newBlogUrl}
          onChange={this.handleFieldChange}
        />
      </Togglable>

      <h2>Blogs</h2>
      {this.state.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={this.state.user} />
      )}

    </div>
  )

  beforelogin = () => {
    return (
      //<Togglable buttonLabel="login">
      <LoginForm
        onSubmit={this.login}
        valueName={this.state.username}
        valuePsw={this.state.password}
        onChange={this.handleFieldChange}
      />
      //</Togglable>
    )
  }

  render() {
    return (
      <div>
        <h1>BlogApp</h1>

        <Info message={this.state.error} type="error" />
        <Info message={this.state.success} type="success" />
        <Info message={this.state.info} type="info" />

        {this.state.user === '' ?
          this.beforelogin() :
          this.afterLogin()
        }

      </div>
    )
  }



} // luokan sulku

export default App

