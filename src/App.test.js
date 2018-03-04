import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe.only('<App />', () => {
  let app

  it('renders only login form without login', () => {
    app = mount(<App />)
    app.update()
    expect(app.find('.loginForm').exists())
    expect(app.find(Blog).length).toEqual(0)
  })

  it('does not render blogs before login', () => {
    app = mount(<App />)
    app.update()
    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(0)
  })

  it('renders all blogs after login', () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedUser', JSON.stringify(user))

    console.log(window.localStorage.getItem('loggedUser'))
    app = mount(<App />)
    app.update()

    console.log(app.debug())
    console.log(app.html())

    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(blogService.listWithManyBlogs.length)
  })


})




