/**
 * @class Shiitake
 * @description React line clamp that won't get you fired
 */

import React from 'react';
import PropTypes from 'prop-types';

import ResizeListener from './ResizeListener';

import {
  wrapperStyles,
  childrenStyles,
  block,
  spreaderStyles,
  sizerWrapperStyles,
  setTag,
  passProps,
} from './constants';

class Shiitake extends React.Component {
  static propTypes = {
    lines: PropTypes.number.isRequired,
    className: PropTypes.string,
    children: PropTypes.string.isRequired,
    renderFullOnServer: PropTypes.bool,
    throttleRate: PropTypes.number,
    tagName: PropTypes.string,
    overflowNode: PropTypes.node,
  }

  static defaultProps = {
    className: '',
    renderFullOnServer: false,
    throttleRate: undefined,
    tagName: undefined,
    overflowNode: '\u2026',
    // in case someone acidentally passes something undefined in as children
    children: '',
  }

  constructor(props) {
    super(props);

    const allChildren = (typeof props.children === 'string') ? props.children : '';
    const children = (props.renderFullOnServer) ? allChildren : '';

    this.state = {
      lastCalculatedWidth: -1,
      testChildren: '',
      children,
      allChildren,
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize();
  }

  componentWillReceiveProps(newProps) {
    const { children, lines } = newProps;

    // if we've got different children, reset and retest
    if (children !== this.state.allChildren) {
      const allChildren = (typeof children === 'string') ? children : '';
      this.setState({ lastCalculatedWidth: -1, children, allChildren });
      this._setTestChildren(0, children.length);
    } else if (lines !== this.props.lines) {
      // for a lines number change, retrim the full string
      this._callDeffered(() => {
        this.setState({ testChildren: '', lastCalculatedWidth: -1, children: this.state.allChildren });
        this.handleResize();
      });
    }
  }

  _callDeffered(func) {
    setTimeout(() => {
      if (this.spreader) { func.bind(this)(); }
    }, 0);
  }

  _checkHeight(start, end) {
    const contentHeight = this.testChildren.offsetHeight;
    const halfWay = end - Math.round((end - start) / 2);

    // TODO: refine this flag, make simpler
    const linear = (end - start < 6
      || (end === this.state.testChildren.length && end !== this.state.allChildren.length)
      || this.state.lastCalculatedWidth > -1);

    // do we need to trim?
    if (contentHeight > this._targetHeight) {
      // chunk/ trim down
      if (linear) {
        this._setTestChildren(this.state.testChildren.length, this.state.testChildren.length - 1);
      } else {
        this._setTestChildren(start, halfWay);
      }

    // we've used all the characters in a window expand situation
    } else if (this.state.testChildren.length === this.state.allChildren.length) {
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
  _setTestChildren(start, end) {
    // if it's within the treshold or has already been calculated, go linear
    const trimEnd = (end - start < 6 || this.state.lastCalculatedWidth > -1) ? end : end - Math.round((end - start) / 2);

    this.setState({ testChildren: this.state.allChildren.substring(0, trimEnd) });
    this._callDeffered(this._checkHeight.bind(this, start, end));
  }

  _setChildren() {
    let children = this.state.allChildren;

    // are we actually trimming?
    if (this.state.testChildren.length < this.state.allChildren.length) {
      children = this.state.testChildren.split(' ').slice(0, -1).join(' ');
    }
    this._handlingResize = false;
    this.setState({ children, lastCalculatedWidth: this.spreader.offsetWidth });
  }

  // adds the trimmed content to state and fills the sizer on resize events
  handleResize() {
    // if we don't have a spreader, let it come around again
    if (!this.spreader) { return; }

    const availableWidth = this.spreader.offsetWidth;
    this._targetHeight = this.sizer.offsetHeight;

    // set the max height right away, so that the resize throttle doesn't allow line break jumps
    // also populate with the full string if we don't have a working trimmed string yet
    this.setState({ fixHeight: this._targetHeight, children: this.state.children || this.state.allChildren });

    // was there a width change, or lines change?
    if (availableWidth !== this.state.lastCalculatedWidth && !this._handlingResize) {
      this._handlingResize = true;

      // first render?
      if (this.state.testChildren === '') {
        // give it the full string and check the height
        this.setState({ testChildren: this.state.allChildren });
        this._callDeffered(this._checkHeight.bind(this, 0, this.state.allChildren.length));

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

  render() {
    const { renderFullOnServer, className, throttleRate, overflowNode } = this.props;
    const { fixHeight, children, testChildren } = this.state;
    const tagNames = { main: setTag(this.props.tagName) };

    const vertSpacers = [];
    for (let i = 0; i < this.props.lines; i++) {
      vertSpacers.push(<span style={block} key={i}>W</span>);
    }

    const thisHeight = (fixHeight || 0) + 'px';
    const maxHeight = (renderFullOnServer) ? '' : thisHeight;

    const overflow = (testChildren.length < this.state.allChildren.length) ? overflowNode : null;

    return (
      <tagNames.main className={className || ''} {...passProps(this.props)}>
        <ResizeListener handleResize={this.handleResize} throttleRate={throttleRate} />

        <span style={{ ...wrapperStyles, maxHeight }}>
          <span style={childrenStyles}>{children}{overflow}</span>

          <span ref={(node) => { this.spreader = node; }} style={spreaderStyles}>{this.state.allChildren}</span>

          <span style={sizerWrapperStyles}>
            <span ref={(node) => { this.sizer = node; }} style={block}>{vertSpacers}</span>
            <span ref={(node) => { this.testChildren = node; }} style={block}>{testChildren}{overflow}</span>
          </span>
        </span>
      </tagNames.main>
    );
  }
}

export default Shiitake;
