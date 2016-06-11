/**
 * @class Shiitake
 * @description React line clamp that won't get you fired
 */

/* eslint react/no-multi-comp: 0, react/no-did-mount-set-state: 0 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';

const throttleRate = 200;

function getString(fullString, lineHeight, height, targetLines) {
  const currentLines = Math.round(height / lineHeight);
  const trimPercentage = Math.round((targetLines / currentLines) * 100);
  const endLength = fullString.length * (trimPercentage / 100);
  const lastSpace = fullString.indexOf(' ', endLength);

  if (lastSpace < 0) {
    return fullString;
  }

  return fullString.substring(0, lastSpace);
}

class ResizeWrapper extends React.Component {

  static propTypes = {
    onWindowResize: PropTypes.func,
  };

  constructor() {
    super();
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    if (this.props.onWindowResize) {
      window.addEventListener('resize', this.handleResize);
    }
  }

  componentWillUnmount() {
    if (this.props.onWindowResize) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleResize(event) {
    if (typeof this.props.onWindowResize === 'function') {
      // we want this to fire immediately the first time but wait to fire again
      // that way when you hit a break it happens fast and only lags if you hit another break immediately
      if (!this.resizeTimer) {
        this.props.onWindowResize(event);
        this.resizeTimer = setTimeout(() => {
          this.resizeTimer = false;
        }, throttleRate);
      }
    }
  }

  render() {
    return (<div />);
  }
}

export default class extends React.Component {
  constructor() {
    super();

    this.handleResize = this.handleResize.bind(this);
  }

  state = {
    testRender: true,
    timer: null,
    currentHeight: null,
  }

  componentDidMount() {
    this.handleResize();
  }

  handleResize() {
    // test render
    let currentHeight = ReactDOM.findDOMNode(this.refs.wrapper).offsetHeight;
    this.setState({ testRender: true, children: null, currentHeight });

    clearTimeout(this.timer);

    // flush the stack then do the real render
    this.timer = setTimeout(() => {
      const lineHeight = ReactDOM.findDOMNode(this.refs.sizer).offsetHeight;
      currentHeight = ReactDOM.findDOMNode(this.refs.content).offsetHeight;

      const children = getString(this.props.children, lineHeight, currentHeight, this.props.lines);

      this.setState({ testRender: false, children, currentHeight: null });
    }, 0);
  }

  render() {
    assert(typeof this.props.children === 'string', 'You must only have text as the child of Shiitake');
    const { testRender, currentHeight } = this.state;

    // make the text transparent on the first render flow to measure without displaying
    // fix the height if it a re-render on window size
    const wrapperStyles = (testRender) ? {
      height: `${currentHeight}px`,
      overflow: 'hidden',
      color: 'transparent',
    } : {};

    // this can be used to measure a nested line of text
    const sizerStyles = {
      position: 'absolute',
      left: '-10000px',
    };

    return (
      <div className="shiitake" ref="wrapper" style={wrapperStyles}>
        <ResizeWrapper onWindowResize={this.handleResize} />
        <div style={sizerStyles} ref="sizer">WWW</div>

        <div ref="content">
          {this.state.children || this.props.children}
        </div>
      </div>
    );
  }
}
