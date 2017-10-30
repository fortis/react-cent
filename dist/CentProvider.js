'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _centrifuge = require('centrifuge');

var _centrifuge2 = _interopRequireDefault(_centrifuge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CentProvider = function (_React$Component) {
  _inherits(CentProvider, _React$Component);

  function CentProvider(props, context) {
    _classCallCheck(this, CentProvider);

    var _this = _possibleConstructorReturn(this, (CentProvider.__proto__ || Object.getPrototypeOf(CentProvider)).call(this, props, context));

    _this.componentDidMount = function () {
      _this.cent.connect(_this.props.onConnect);
    };

    _this.getChildContext = function () {
      return { cent: _this.cent };
    };

    _this.render = function () {
      return _react.Children.only(_this.props.children);
    };

    _this.cent = new _centrifuge2.default(_this.props.config);
    return _this;
  }

  return CentProvider;
}(_react2.default.Component);

CentProvider.propTypes = {
  children: _react2.default.PropTypes.element.isRequired,
  onConnect: _propTypes2.default.func,
  config: _propTypes2.default.shape({
    insecure: _propTypes2.default.bool
  })
};
CentProvider.defaultProps = {
  onConnect: null,
  config: {
    url: 'localhost:8000/connect',
    insecure: false
  }
};
CentProvider.childContextTypes = {
  cent: _propTypes2.default.object.isRequired
};
exports.default = CentProvider;