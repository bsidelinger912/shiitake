/**
 * @class ResizeListener
 * @description extendable component that uses the provided .handleResize() method
 */

/* eslint no-underscore-dangle: 0 */

import React, { PropTypes } from 'react';

const defaultThrottleRate = 200;

class ResizeListener extends React.Component {
  static propTypes = {
    handleResize: PropTypes.func.isRequired,
    throttleRate: PropTypes.number,
  }

  static defaultProps = {
    throttleRate: defaultThrottleRate,
  }

  constructor() {
    super();

    this._handleResize = this._handleResize.bind(this);
  }

  componentDidMount() {
    // We need to bind again when passing to the window listner in for IE10
    this._handleResize = this._handleResize.bind(this);
    window.addEventListener('resize', this._handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  }

  _handleResize() {
    if (!this._resizeTimer) {
      this.props.handleResize();

      // throttle the listener
      this._resizeTimer = setTimeout(() => {
        // if a resize came in while we paused, adjust again once after the pause before we start listening again
        if (this._pendingResize) {
          this.props.handleResize();
        }

        this._resizeTimer = false;
      }, this.props.throttleRate);
    } else {
      this._pendingResize = true;
    }
  }

  render() {
    return null;
  }
}

export default ResizeListener;
