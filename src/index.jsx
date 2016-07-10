/**
 * @class Shiitake
 * @description React line clamp that won't get you fired
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import ResizeCore from './ResizeCore';
import {
  wrapperStyles,
  childrenStyles,
  block,
  spreaderStyles,
  sizerWrapperStyles,
  setTag,
  passProps,
} from './constants';

export default class extends ResizeCore {
  state = {
    lastCalculatedWidth: 0,
    children: '',
    testChildren: '',
  }

  static propTypes = {
    lines: PropTypes.number.isRequired,
    className: PropTypes.string,
    children: PropTypes.string.isRequired,
  }

  _callDeffered(func) {
    setTimeout(() => {
      if (Object.keys(this.refs).length > 0) { func.bind(this)(); }
    }, 0);
  }

  _checkHeight(start, end) {
    // console.log(`check height called, start: ${start}, end: ${end}`);
    const contentHeight = ReactDOM.findDOMNode(this.refs.testChildren).offsetHeight;
    const halfWay = end - Math.round((end - start) / 2);

    // do we need to trim?
    if (contentHeight > this._targetHeight) {
      const endIndex = (this._linearDown) ? end - 1 : halfWay;
      this._setTestChildren(start, endIndex);
    } else {
      // did we just get here while coming down one at a time?
      if (this._linearDown) {
        // success, we have the exact max characters that'll fit
        this._linearDown = false;
        this._setChildren();

      // do we need to add?
      } else if (this.state.testChildren.length !== this.props.children.length) {
        this._setTestChildren(halfWay, end);
      }
    }
  }

  // this will render test children trimmed at halfway point then come around to test
  _setTestChildren(start, end) {
    const trimEnd = (end - start < 6) ? end : end - Math.round((end - start) / 2);
    this._linearDown = (end - start < 6);

    this.setState({ testChildren: this.props.children.substring(0, trimEnd) });
    this._callDeffered(this._checkHeight.bind(this, start, end));
  }

  _setChildren() {
    let children = this.props.children;

    // are we actually trimming?
    if (this.state.testChildren.length < this.props.children.length) {
      children = this.state.testChildren.slice(0, -3).split(' ').slice(0, -1);
      children = `${children.join(' ')}...`;
    }

    this.setState({ children, lastCalculatedWidth: ReactDOM.findDOMNode(this.refs.spreader).offsetWidth });
  }

  // adds the trimmed content to state and fills the sizer on resize events
  handleResize() {
    // if we don't have a spreader, let it come around again
    if (!this.refs.spreader) { return; }

    const availableWidth = ReactDOM.findDOMNode(this.refs.spreader).offsetWidth;
    this._targetHeight = ReactDOM.findDOMNode(this.refs.sizer).offsetHeight;

    // set the max height right away, so that the resize throttle doesn't allow line break jumps
    // also populate with the full string if we don't have a working trimmed string yet
    this.setState({ fixHeight: this._targetHeight, children: this.state.children || this.props.children });

    // was there a width change?
    if (availableWidth !== this.state.lastCalculatedWidth) {
      // first render?
      if (this.state.testChildren === '') {
        this._setTestChildren(0, this.props.children.length);

      // window got smaller?
      } else if (availableWidth < this.state.lastCalculatedWidth) {
        this._setTestChildren(0, this.state.testChildren.length);

      // window got larger?
      } else {
        this._setTestChildren(this.state.testChildren.length, this.props.children.length);
      }
    }
  }

  render() {
    const { fixHeight, children, testChildren } = this.state;
    const tagNames = { main: setTag(this.props.tagName) };

    const vertSpacers = [];
    for (let i = 0; i < this.props.lines; i++) {
      vertSpacers.push(<span style={block} key={i}>W</span>);
    }

    return (
      <tagNames.main className={this.props.className || ''} {...passProps(this.props)}>
        <span style={{ ...wrapperStyles, maxHeight: `${fixHeight || 0}px` }}>
          <span style={childrenStyles}>{children}</span>

          <span ref="spreader" style={spreaderStyles}>{this.props.children}</span>

          <span style={sizerWrapperStyles}>
            <span ref="sizer" style={block}>{vertSpacers}</span>
            <span ref="testChildren" style={block}>{testChildren}</span>
          </span>
        </span>
      </tagNames.main>
    );
  }
}
