import React from 'react'
import PropTypes from 'prop-types'

const cent = (ComponentToWrap) => {
  return class CentComponent extends React.Component {
    static contextTypes = {
      cent: PropTypes.object.isRequired
    }

    render = () => <ComponentToWrap {...this.props} cent={this.context.cent} />
  }
}

export default cent
