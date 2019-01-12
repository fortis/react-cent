import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import Centrifuge from 'centrifuge'

class Manager extends Centrifuge {
  constructor (options) {
    super(options)
    this.subscriptions = {}
  }

  subscribe(channel, events) {
    this.subscriptions[channel] = super.subscribe(channel, events);

    return this.subscriptions[channel]
  }

  getSubscription(channel) {
    const sub = this.subscriptions[channel];
    if (!sub) {
      return null;
    }

    return sub;
  }
}

export default class Provider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onConnect: PropTypes.func,
    config: PropTypes.shape({
      url: PropTypes.string.isRequired,
      insecure: PropTypes.bool
    })
  }

  static defaultProps = {
    onConnect: null,
    config: {
      insecure: false
    }
  }

  static childContextTypes = {
    cent: PropTypes.object.isRequired
  }

  constructor (props, context) {
    super(props, context)
    this.cent = new Manager(this.props.config)
  }

  componentDidMount = () => {
    this.cent.connect(this.props.onConnect)
  }

  getChildContext = () => ({cent: this.cent})

  render = () => Children.only(this.props.children)
}
