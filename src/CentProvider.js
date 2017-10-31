import React, { Children } from 'react'
import PropTypes from 'prop-types'
import SockJS from 'sockjs-client'
import Centrifuge from 'centrifuge'

export default class CentProvider extends React.Component {
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

    this.cent = new Centrifuge({
      ...this.props.config,
      sockJS: SockJS
    })
  }

  componentDidMount = () => {
    this.cent.connect(this.props.onConnect)
  }

  getChildContext = () => ({cent: this.cent})

  render = () => Children.only(this.props.children)
}
