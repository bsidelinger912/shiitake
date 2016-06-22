/**
 * @class Shiitake
 * @description React line clamp that won't get you fired
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import ResizeCore from './ResizeCore';

const sizerWrapperStyles = {
  position: 'absolute',
  left: '-100000px',
  top: '200px',
  width: '100%',
};

export default class extends ResizeCore {
  state = {
    lastCalculatedWidth: 0,
    children: '',
    testChildren: '',
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.string.isRequired,
  }

  _checkHeight(adjustDown) {
    const contentHeight = ReactDOM.findDOMNode(this.refs.testChildren).offsetHeight;
    return (adjustDown) ? (contentHeight <= this._targetHeight) : (contentHeight > this._targetHeight);
  }

  // this function will add everything then remove one at a time until the desired height is obtained
  _adjustDown() {
    if (this.state.testChildren === '') {
      this.setState({ testChildren: this.props.children });
      setTimeout(() => { this._adjustDown(); }, 0);
    } else if (this._checkHeight(true)) {
      this._setChildren();
    } else {
      this.setState({ testChildren: this.state.testChildren.slice(0, -1) });
      setTimeout(() => { this._adjustDown(); }, 0);
    }
  }

  _adjustUp() {
    // have we used all our characters?
    if (this._checkHeight(false)) {
      setTimeout(() => { this._adjustDown(); }, 0);
    } else if (this.state.testChildren.length !== this.props.children.length) {
      this.setState({ testChildren: this.props.children.substring(0, this.state.testChildren.length + 1) });
      setTimeout(() => { this._adjustUp(); }, 0);
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

    this.setState({ children }); // , fixHeight: null });
  }

  // adds the trimmed content to state and fills the sizer on resize events
  handleResize() {
    const availableWidth = ReactDOM.findDOMNode(this.refs.content).offsetWidth;
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

    const wrapperStyles = { position: 'relative' };

    // the idea here is to fix the height while were adding/removing from the test container
    if (fixHeight) {
      wrapperStyles.maxHeight = `${fixHeight}px`;
      wrapperStyles.overflow = 'hidden';
    }

    const vertSpacers = [];
    for (let i = 0; i < this.props.lines; i++) {
      vertSpacers.push(<div key={i}>W</div>);
    }

    return (
      <div className={this.props.className || ''}>
        <div style={wrapperStyles}>
          <div style={sizerWrapperStyles}>
            <div ref="sizer">{vertSpacers}</div>
            <div ref="testChildren">{testChildren}</div>
          </div>
          <div ref="content" style={{ width: '100%' }}>{children}</div>
        </div>
      </div>
    );
  }
}
