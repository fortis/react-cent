/* global jest, it, describe, expect */

jest.unmock('../src/cent-provider')
import React from 'react'
import PropTypes from 'prop-types'
import CentProvider from '../src/cent-provider'

describe('CentProvider', () => {
  const config = {url: 'http://localhost:8000/connect', insecure: true}

  it('should throw Exception if the `url` ' +
    'is not provided in the configuration', () => {
    expect(() => { CentProvider({}) }).toThrow()
  })

  it('should provide `cent` context', () => {
    const wrapper = new CentProvider({config})
    expect(wrapper.getChildContext().cent.constructor.name).toBe('CentManager')
    expect(CentProvider.childContextTypes.cent).toBe(PropTypes.object.isRequired)
  })

  it('should render children', () => {
    const div = React.createFactory('div')
    const children = React.createElement(div)
    const wrapper = new CentProvider({config, children})
    const render = wrapper.render()
    expect(render).toBe(children)
  })

  it('should have children proptype required', () => {
    expect(CentProvider.propTypes.children).toBe(PropTypes.element.isRequired)
  })
})
