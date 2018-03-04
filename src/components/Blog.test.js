import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Blog from './Blog'

describe('<Blog />', () => {

  it('renders content only with header', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'joku kijroittajat',
      url: 'www.joku.fi',
      likes: 3
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    //console.log(blogComponent.debug())

    expect(blogComponent.find('span').text()).toContain('Komponenttitestaus tapahtuu jestillä ja enzymellä')
    expect(blogComponent.find('h3').text()).toContain('joku kijroittajat')

    const div = blogComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: 'none' })

  })

  it('after clicking title all info is included', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'joku kijroittajat',
      url: 'www.joku.fi',
      likes: 3
    }
    const blogComponent = shallow(<Blog blog={blog} />)
    //console.log(blogComponent.debug())

    const button = blogComponent.find('.toggleVisibility')
    button.simulate('click')

    const div = blogComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: '' })

    expect(blogComponent.find('.url').exists())
    expect(blogComponent.find('.like').exists())
    expect(blogComponent.find('.like').text()).toContain('3')
    expect(blogComponent.find('button').exists())

  })



})
