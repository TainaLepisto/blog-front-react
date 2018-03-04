import React from 'react'

import blogService from '../services/blogs'


class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  liked = async () => {
    try {
      const blogObject = {
        likes: this.props.blog.likes + 1
      }

      await blogService.update(this.props.blog.id, blogObject)
      // tämä kyllä päivittää tykkäyksen kantaan, mutta ei päivitä käyttöliittymään tietoa mitenkään

    } catch (exception) {
      console.log(exception)
      this.setState({
        error: 'something went wrong and your like is not saved'
      })
      setTimeout(() => {
        this.setState({ error: '' })
      }, 5000)
    }

  }

  remove = async () => {
    try{
      await blogService.remove(this.props.blog.id)
      // tämä kyllä poistaa kannasta, mutta ei päivitä käyttöliittymään tietoa mitenkään

    } catch (exception) {
      console.log(exception)
      this.setState({
        error: 'something went wrong and blog is not removed'
      })
      setTimeout(() => {
        this.setState({ error: '' })
      }, 5000)
    }

  }

  canBeRemoved = () => {
    if (this.props.blog.user === undefined || this.props.blog.user.username === this.props.user.username) {
      return (
        <button onClick={ () => this.remove() }>
          remove
        </button>
      )
    }
  }

  render() {

    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    let user = 'Unknown'
    if (this.props.blog.user && this.props.blog.user.name) {
      user = this.props.blog.user.name
    }

    const placeholder = `#${this.props.blog.id}`

    return (

      <div>
        <a name={this.props.blog.id}> </a>
        <div className="block">

          <h3>
            <a href={placeholder} onClick={this.toggleVisibility}>
              <span>
                {this.props.blog.title}
              </span>
            </a>
            :: {this.props.blog.author}
          </h3>

          <div style={showWhenVisible}>
            <p>
              <a href={this.props.blog.url} target="_blank">
                {this.props.blog.url}
              </a>
            </p>
            <p>
              {this.props.blog.likes} likes &nbsp;&nbsp;
              <button onClick={ () => this.liked() }>
                like
              </button>
            </p>
            <p>added by {user}</p>
            {this.canBeRemoved()}
          </div>
        </div>
      </div>
    )

  }
}



export default Blog
