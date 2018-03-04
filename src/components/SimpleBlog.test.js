import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'joku kijroittajat',
      likes: 3
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick='' />)
    //console.log(simpleBlogComponent.debug())
    //console.log(simpleBlogComponent.find('.title').text())

    expect(simpleBlogComponent.find('.title').text()).toContain('Komponenttitestaus tapahtuu jestillä ja enzymellä')
    expect(simpleBlogComponent.find('.likes').exists())
    expect(simpleBlogComponent.find('.likes').text()).toContain('3')
    expect(simpleBlogComponent.find('button').exists())

  })

  it('clicking the button twice calls event handler also twice', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'joku kijroittajat',
      likes: 3
    }

    const mockHandler = jest.fn()

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

    const button = simpleBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })



})
