/**
 * @class Shiitake
 * @description React line clamp that won't get you fired
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import ResizeCore from './ResizeCore';
import { wrapperStyles, childrenStyles, block, spreaderStyles, sizerWrapperStyles, setTag } from './constants';

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

  _checkHeight(adjustDown) {
    const contentHeight = ReactDOM.findDOMNode(this.refs.testChildren).offsetHeight;
    return (adjustDown) ? (contentHeight <= this._targetHeight) : (contentHeight > this._targetHeight);
  }

  // this function will add everything then remove one at a time until the desired height is obtained
  _adjustDown() {
    if (this.state.testChildren === '') {
      this.setState({ testChildren: this.props.children });
      this._callDeffered(this._adjustDown);
    } else if (this._checkHeight(true)) {
      this._setChildren();
    } else {
      this.setState({ testChildren: this.state.testChildren.slice(0, -1) });
      this._callDeffered(this._adjustDown);
    }
  }

  _adjustUp() {
    // have we used all our characters?
    if (this._checkHeight(false)) {
      this._callDeffered(this._adjustDown);
    } else if (this.state.testChildren.length !== this.props.children.length) {
      this.setState({ testChildren: this.props.children.substring(0, this.state.testChildren.length + 1) });
      this._callDeffered(this._adjustUp);
    } else {
      this._setChildren();
    }
  }

  _setChildren() {
    let children = this.props.children;

    // are we actually trimming?
    if (this.state.testChildren.length < this.props.children.length) {
      children = this.state.testChildren.slice(0, -3).split(' ').slice(0, -1);
      children = `${children.join(' ')}...`;
    }

    this.setState({ children });
  }

  // adds the trimmed content to state and fills the sizer on resize events
  handleResize() {
    // if we don't have a spreader, let it come around again
    if (!this.refs.spreader) { return; }

    const availableWidth = ReactDOM.findDOMNode(this.refs.spreader).offsetWidth;
    this._targetHeight = ReactDOM.findDOMNode(this.refs.sizer).offsetHeight;

    // set the max height right away, so that the resize throttle doesn't allow line break jumps
    this.setState({ fixHeight: this._targetHeight });

    // was there a width change?
    if (availableWidth !== this.state.lastCalculatedWidth) {
      // first render?
      if (this.state.children === '' || availableWidth < this.state.lastCalculatedWidth) {
        this._adjustDown();
      } else {
        this._adjustUp();
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
      <tagNames.main className={this.props.className || ''}>
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
