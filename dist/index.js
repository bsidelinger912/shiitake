'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ResizeListener = require('./ResizeListener');

var _ResizeListener2 = _interopRequireDefault(_ResizeListener);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Shiitake
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description React line clamp that won't get you fired
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Shiitake = function (_React$Component) {
  _inherits(Shiitake, _React$Component);

  function Shiitake(props) {
    _classCallCheck(this, Shiitake);

    var _this = _possibleConstructorReturn(this, (Shiitake.__proto__ || Object.getPrototypeOf(Shiitake)).call(this, props));

    var children = props.renderFullOnServer ? props.children : '';

    _this.state = {
      lastCalculatedWidth: -1,
      testChildren: '',
      children: children
    };

    _this.handleResize = _this.handleResize.bind(_this);
    return _this;
  }

  // in case someone acidentally passes something undefined in as children


  _createClass(Shiitake, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleResize();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var _this2 = this;

      var children = newProps.children,
          lines = newProps.lines;

      // if we've got different children, reset and retest

      if (children !== this.props.children) {
        this.setState({ lastCalculatedWidth: -1, children: children });
        this._setTestChildren(0, children.length);
      } else if (lines !== this.props.lines) {
        // for a lines number change, retrim the full string
        this._callDeffered(function () {
          _this2.setState({ testChildren: '', lastCalculatedWidth: -1, children: _this2.props.children });
          _this2.handleResize();
        });
      }
    }
  }, {
    key: '_callDeffered',
    value: function _callDeffered(func) {
      var _this3 = this;

      setTimeout(function () {
        if (_this3.spreader) {
          func.bind(_this3)();
        }
      }, 0);
    }
  }, {
    key: '_checkHeight',
    value: function _checkHeight(start, end) {
      var contentHeight = this.testChildren.offsetHeight;
      var halfWay = end - Math.round((end - start) / 2);

      // TODO: refine this flag, make simpler
      var linear = end - start < 6 || end === this.state.testChildren.length && end !== this.props.children.length || this.state.lastCalculatedWidth > -1;

      // do we need to trim?
      if (contentHeight > this._targetHeight) {
        // chunk/ trim down
        if (linear) {
          this._setTestChildren(this.state.testChildren.length, this.state.testChildren.length - 1);
        } else {
          this._setTestChildren(start, halfWay);
        }

        // we've used all the characters in a window expand situation
      } else if (this.state.testChildren.length === this.props.children.length) {
        this._setChildren();
      } else if (linear) {
        // if we just got here by decrementing one, we're good
        if (start > end) {
          this._setChildren();
        } else {
          // window grew, increment up one
          this._setTestChildren(this.state.testChildren.length, this.state.testChildren.length + 1);
        }
      } else {
        // chunk up, still in binary search mode
        this._setTestChildren(halfWay, end);
      }
    }

    // this will render test children trimmed at halfway point then come around to test height again

  }, {
    key: '_setTestChildren',
    value: function _setTestChildren(start, end) {
      // if it's within the treshold or has already been calculated, go linear
      var trimEnd = end - start < 6 || this.state.lastCalculatedWidth > -1 ? end : end - Math.round((end - start) / 2);

      this.setState({ testChildren: this.props.children.substring(0, trimEnd) });
      this._callDeffered(this._checkHeight.bind(this, start, end));
    }
  }, {
    key: '_setChildren',
    value: function _setChildren() {
      var children = this.props.children;

      // are we actually trimming?
      if (this.state.testChildren.length < this.props.children.length) {
        children = this.state.testChildren.slice(0, -3).split(' ').slice(0, -1);
        children = children.join(' ') + '...';
      }
      this._handlingResize = false;
      this.setState({ children: children, lastCalculatedWidth: this.spreader.offsetWidth });
    }

    // adds the trimmed content to state and fills the sizer on resize events

  }, {
    key: 'handleResize',
    value: function handleResize() {
      // if we don't have a spreader, let it come around again
      if (!this.spreader) {
        return;
      }

      var availableWidth = this.spreader.offsetWidth;
      this._targetHeight = this.sizer.offsetHeight;

      // set the max height right away, so that the resize throttle doesn't allow line break jumps
      // also populate with the full string if we don't have a working trimmed string yet
      this.setState({ fixHeight: this._targetHeight, children: this.state.children || this.props.children });

      // was there a width change, or lines change?
      if (availableWidth !== this.state.lastCalculatedWidth && !this._handlingResize) {
        this._handlingResize = true;

        // first render?
        if (this.state.testChildren === '') {
          // give it the full string and check the height
          this.setState({ testChildren: this.props.children });
          this._callDeffered(this._checkHeight.bind(this, 0, this.props.children.length));

          // window got smaller?
        } else if (availableWidth < this.state.lastCalculatedWidth) {
          // increment down one
          this._callDeffered(this._checkHeight.bind(this, this.state.testChildren.length, this.state.testChildren.length - 1));

          // window got larger?
        } else {
          // increment up one
          this._callDeffered(this._checkHeight.bind(this, this.state.testChildren.length, this.state.testChildren.length + 1));
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          renderFullOnServer = _props.renderFullOnServer,
          className = _props.className,
          throttleRate = _props.throttleRate;
      var _state = this.state,
          fixHeight = _state.fixHeight,
          children = _state.children,
          testChildren = _state.testChildren;

      var tagNames = { main: (0, _constants.setTag)(this.props.tagName) };

      var vertSpacers = [];
      for (var i = 0; i < this.props.lines; i++) {
        vertSpacers.push(_react2.default.createElement(
          'span',
          { style: _constants.block, key: i },
          'W'
        ));
      }

      var thisHeight = (fixHeight || 0) + 'px';
      var maxHeight = renderFullOnServer ? '' : thisHeight;

      return _react2.default.createElement(
        tagNames.main,
        _extends({ className: className || '' }, (0, _constants.passProps)(this.props)),
        _react2.default.createElement(_ResizeListener2.default, { handleResize: this.handleResize, throttleRate: throttleRate }),
        _react2.default.createElement(
          'span',
          { style: _extends({}, _constants.wrapperStyles, { maxHeight: maxHeight }) },
          _react2.default.createElement(
            'span',
            { style: _constants.childrenStyles },
            children
          ),
          _react2.default.createElement(
            'span',
            { ref: function ref(node) {
                _this4.spreader = node;
              }, style: _constants.spreaderStyles },
            this.props.children
          ),
          _react2.default.createElement(
            'span',
            { style: _constants.sizerWrapperStyles },
            _react2.default.createElement(
              'span',
              { ref: function ref(node) {
                  _this4.sizer = node;
                }, style: _constants.block },
              vertSpacers
            ),
            _react2.default.createElement(
              'span',
              { ref: function ref(node) {
                  _this4.testChildren = node;
                }, style: _constants.block },
              testChildren
            )
          )
        )
      );
    }
  }]);

  return Shiitake;
}(_react2.default.Component);

Shiitake.propTypes = {
  lines: _propTypes2.default.number.isRequired,
  className: _propTypes2.default.string,
  children: _propTypes2.default.string.isRequired,
  renderFullOnServer: _propTypes2.default.bool,
  throttleRate: _propTypes2.default.number,
  tagName: _propTypes2.default.string
};
Shiitake.defaultProps = {
  className: '',
  renderFullOnServer: false,
  throttleRate: undefined,
  tagName: undefined
};
Shiitake.defaultProps = { children: '' };
exports.default = Shiitake;