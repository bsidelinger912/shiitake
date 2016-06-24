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
  position: 'relative',
  left: '-20000px',
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