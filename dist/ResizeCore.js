'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class ResizeCore
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description extendable component that uses the provided .handleResize() method
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/* eslint no-underscore-dangle: 0 */

var defaultThrottleRate = 200;

var ResizeCore = function (_React$Component) {
  _inherits(ResizeCore, _React$Component);

  function ResizeCore() {
    _classCallCheck(this, ResizeCore);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ResizeCore).call(this));

    _this.throttleRate = defaultThrottleRate;
    _this._handleResize = _this._handleResize.bind(_this);
    return _this;
  }

  _createClass(ResizeCore, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (typeof this.handleResize === 'function') {
        this.handleResize();

        // yes, zero is not allowed
        if (this.props.throttleRate) {
          this.throttleRate = this.props.throttleRate;
        }

        // We need to bind again when passing to the window listner in for IE10
        this._handleResize = this._handleResize.bind(this);
        window.addEventListener('resize', this._handleResize);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (typeof this.handleResize === 'function') {
        window.removeEventListener('resize', this._handleResize);
      }
    }
  }, {
    key: '_handleResize',
    value: function _handleResize() {
      var _this2 = this;

      if (!this._resizeTimer && typeof this.handleResize === 'function') {
        this.handleResize();

        // throttle the listener
        this._resizeTimer = setTimeout(function () {
          // if a resize came in while we paused, adjust again once after the pause before we start listening again
          if (_this2._pendingResize) {
            _this2.handleResize();
          }

          _this2._resizeTimer = false;
        }, this.throttleRate);
      } else {
        this._pendingResize = true;
      }
    }
  }]);

  return ResizeCore;
}(_react2.default.Component);

exports.default = ResizeCore;