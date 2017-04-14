'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setTag = setTag;
exports.passProps = passProps;
/**
 * @file style constants and static functions
 */

var block = exports.block = { display: 'block' };

var sizerWrapperStyles = exports.sizerWrapperStyles = _extends({}, block, {
  position: 'absolute',
  left: '-20000px',
  width: '100%'
});

var spreaderStyles = exports.spreaderStyles = _extends({}, block, {
  overflow: 'hidden',
  height: '0px',
  width: '100%'
});

var wrapperStyles = exports.wrapperStyles = _extends({}, block, {
  position: 'relative',
  overflow: 'hidden'
});

var childrenStyles = exports.childrenStyles = _extends({}, block, {
  width: '100%'
});

var tagWhitelist = ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'];

function setTag(tagName) {
  if (!tagName) {
    return 'div';
  }

  var foundTag = tagWhitelist.find(function (tag) {
    return tagName === tag;
  });
  return foundTag || 'div';
}

var eventWhitelist = ['onClick', 'onContextMenu', 'onDoubleClick', 'onDrag onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp'];

function passProps(props) {
  return (Object.keys(props) || {}).reduce(function (passed, key) {
    var hasEvent = eventWhitelist.find(function (event) {
      return event === key;
    });
    var passedCopy = _extends({}, passed);

    if (hasEvent) {
      passedCopy[key] = props[key];
    }

    return passedCopy;
  }, {});
}

// Polyfill
if (!Array.prototype.find) {
  /* eslint no-extend-native: [0], prefer-rest-params: [0] */
  Array.prototype.find = function find(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0; // eslint-disable-line
    var thisArg = arguments[1];
    var value = void 0;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}