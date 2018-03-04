import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import blogService from './services/blogs'

describe.only('<App />', () => {

  it('renders only login form without login', () => {
    let app = mount(<App />)
    app.update()
    expect(app.find('.loginForm').exists())
    expect(app.find(Blog).length).toEqual(0)
  })

  it('does not render blogs before login', () => {
    let app = mount(<App />)
    app.update()
    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(0)
  })

  it('renders all blogs after login', () => {
    let app = mount(<App />)

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedUser', JSON.stringify(user))
    app.update()

    //console.log(window.localStorage.getItem('loggedUser'))
    //console.log(app.debug())
    //console.log(app.html())

    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(blogService.listWithManyBlogs.length)
  })


})




