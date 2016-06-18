/**
 * @class Shiitake
 * @description React line clamp that won't get you fired
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import ResizeCore from './ResizeCore';

const sizerWrapperStyles = {
  position: 'absolute',
  left: '0px',
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

  checkHeight(adjustDown) {
    const targetHeight = ReactDOM.findDOMNode(this.refs.sizer).offsetHeight;
    const contentHeight = ReactDOM.findDOMNode(this.refs.testChildren).offsetHeight;
    return (adjustDown) ? (contentHeight <= targetHeight) : (contentHeight > targetHeight);
  }

  // this function will add everything then remove one at a time until the desired height is obtained
  adjustDown() {
    console.log('adjust down');
    if (this.state.testChildren === '') {
      this.setState({ testChildren: this.props.children });
    } else if (this.checkHeight(true)) {
      console.log('likes the height');
      this.setChildren(true);
    } else {
      console.log('should be trimming one');
      this.setState({ testChildren: this.state.testChildren.slice(0, -1) });
      setTimeout(() => { this.adjustDown(); }, 0);
    }
  }

  adjustUp() {
    if (this.checkHeight(false)) {
      this.setChildren(false);
    } else if (this.state.testChildren.length !== this.props.children.length) {
      this.setState({ testChildren: this.props.children.substring(0, this.state.testChildren.length + 1) });
      setTimeout(() => { this.adjustUp(); }, 0);
    }
  }

  setChildren(adjustDown) {
    const toRemove = (adjustDown) ? -2 : -3;
    const children = this.state.testChildren.slice(0, toRemove).split(' ').slice(0, -1);
    this.setState({ children: `${children.join(' ')}...` });
  }

  // this is the meat of the component,
  // it adds the trimmed content to state and fills the sizer on resize events
  handleResize() {
    const availableWidth = ReactDOM.findDOMNode(this.refs.content).offsetWidth;

    // was there a width change?
    if (availableWidth !== this.state.lastCalculatedWidth) {
      // first render?
      if (this.state.children === '' || availableWidth < this.state.lastCalculatedWidth) {
        this.adjustDown();
      } else {
        this.adjustUp();
      }
    }
  }

  render() {
    const { fixHeight, children, testChildren } = this.state;

    const wrapperStyles = { position: 'relative' };
    if (fixHeight) {
      wrapperStyles.height = `${fixHeight}px`;
      // wrapperStyles.overflow = 'hidden';
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
