import React from 'react'
import PropTypes from 'prop-types'

const cent = (ComponentToWrap) => {
  return class CentComponent extends React.Component {
    render = () => <ComponentToWrap {...this.props} cent={this.context.cent} />
  }
}

cent.contextTypes = {
  cent: PropTypes.object.isRequired
}

export default cent
