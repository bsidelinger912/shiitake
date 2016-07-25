'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ResizeCore2 = require('./ResizeCore');

var _ResizeCore3 = _interopRequireDefault(_ResizeCore2);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Shiitake
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description React line clamp that won't get you fired
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Shiitake = function (_ResizeCore) {
  _inherits(Shiitake, _ResizeCore);

  function Shiitake() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Shiitake);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Shiitake)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      lastCalculatedWidth: -1,
      children: '',
      testChildren: ''
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Shiitake, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ lastCalculatedWidth: -1 });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var children = newProps.children;

      // if we've got different children, retest

      if (children !== this.props.children) {
        this.setState({ lastCalculatedWidth: -1 });
        this._setTestChildren(0, children.length);
      }
    }
  }, {
    key: '_callDeffered',
    value: function _callDeffered(func) {
      var _this2 = this;

      setTimeout(function () {
        if (Object.keys(_this2.refs).length > 0) {
          func.bind(_this2)();
        }
      }, 0);
    }
  }, {
    key: '_checkHeight',
    value: function _checkHeight(start, end) {
      var contentHeight = _reactDom2.default.findDOMNode(this.refs.testChildren).offsetHeight;
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
      this.setState({ children: children, lastCalculatedWidth: _reactDom2.default.findDOMNode(this.refs.spreader).offsetWidth });
    }

    // adds the trimmed content to state and fills the sizer on resize events

  }, {
    key: 'handleResize',
    value: function handleResize() {
      // if we don't have a spreader, let it come around again
      if (!this.refs.spreader) {
        return;
      }

      var availableWidth = _reactDom2.default.findDOMNode(this.refs.spreader).offsetWidth;
      this._targetHeight = _reactDom2.default.findDOMNode(this.refs.sizer).offsetHeight;

      // set the max height right away, so that the resize throttle doesn't allow line break jumps
      // also populate with the full string if we don't have a working trimmed string yet
      this.setState({ fixHeight: this._targetHeight, children: this.state.children || this.props.children });

      // was there a width change?
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
      var _state = this.state;
      var fixHeight = _state.fixHeight;
      var children = _state.children;
      var testChildren = _state.testChildren;

      var tagNames = { main: (0, _constants.setTag)(this.props.tagName) };

      var vertSpacers = [];
      for (var i = 0; i < this.props.lines; i++) {
        vertSpacers.push(_react2.default.createElement(
          'span',
          { style: _constants.block, key: i },
          'W'
        ));
      }

      return _react2.default.createElement(
        tagNames.main,
        _extends({ className: this.props.className || '' }, (0, _constants.passProps)(this.props)),
        _react2.default.createElement(
          'span',
          { style: _extends({}, _constants.wrapperStyles, { maxHeight: (fixHeight || 0) + 'px' }) },
          _react2.default.createElement(
            'span',
            { style: _constants.childrenStyles },
            children
          ),
          _react2.default.createElement(
            'span',
            { ref: 'spreader', style: _constants.spreaderStyles },
            this.props.children
          ),
          _react2.default.createElement(
            'span',
            { style: _constants.sizerWrapperStyles },
            _react2.default.createElement(
              'span',
              { ref: 'sizer', style: _constants.block },
              vertSpacers
            ),
            _react2.default.createElement(
              'span',
              { ref: 'testChildren', style: _constants.block },
              testChildren
            )
          )
        )
      );
    }
  }]);

  return Shiitake;
}(_ResizeCore3.default);

// in case someone acidentally passes something undefined in as children


Shiitake.propTypes = {
  lines: _react.PropTypes.number.isRequired,
  className: _react.PropTypes.string,
  children: _react.PropTypes.string.isRequired
};
Shiitake.defaultProps = { children: '' };

exports.default = Shiitake;