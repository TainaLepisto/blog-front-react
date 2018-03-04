import React from 'react'

import Blog from './components/Blog'
import Info from './components/Info'
import LoginForm from './components/LoginForm'
import AddNewBlog from './components/AddNewBlog'

import blogService from './services/blogs'
import loginService from './services/login'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: '',
      username: '',
      password: '',
      user: '',
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    console.log('componentDidMount')

    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    console.log(loggedUserJSON)

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
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: '' })
      }, 5000)
    }
  }


  logout = () => {
    window.localStorage.clear()
    blogService.setToken('')
    this.setState({ username: '', password: '', user: '' })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  createNewBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: this.state.newBlogTitle,
      author: this.state.newBlogAuthor,
      url: this.state.newBlogUrl
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        console.log(newBlog)
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlogTitle: '',
          newBlogAuthor: '',
          newBlogUrl: ''
        })
      })
  }

  afterLogin = () => (
    <div>
      <p>{this.state.user.name} logged in</p>
      <button onClick={ () => this.logout() }>
        Logout
      </button>

      <AddNewBlog
        onSubmit={this.createNewBlog}
        valueTitle={this.state.newBlogTitle}
        valueAuthor={this.state.newBlogAuthor}
        valueUrl={this.state.newBlogUrl}
        onChange={this.handleFieldChange}
      />

      <h2>blogs</h2>
      {this.state.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  render() {
    return (
      <div>
        <h1>BlogApp</h1>

        <Info message={this.state.error} />

        {this.state.user === '' ?
          <LoginForm
            onSubmit={this.login}
            valueName={this.state.username}
            valuePsw={this.state.password}
            onChange={this.handleFieldChange}
          /> :
          this.afterLogin()
        }

      </div>
    )
  }



} // luokan sulku

export default App

