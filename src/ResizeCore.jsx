/**
 * @class ResizeCore
 * @description extendable component that uses the provided .handleResize() method
 */

/* eslint no-underscore-dangle: 0 */

import React from 'react';

const defaultThrottleRate = 200;

class ResizeCore extends React.Component {
  constructor() {
    super();

    this.throttleRate = defaultThrottleRate;
    this._handleResize = this._handleResize.bind(this);
  }

  componentDidMount() {
    if (typeof this.handleResize === 'function') {
      this.handleResize();

      // yes, zero is not allowed
      if (this.props.throttleRate) {
        this.throttleRate = this.props.throttleRate;
      }

      window.addEventListener('resize', this._handleResize);
    }
  }

  componentWillUnmount() {
    if (typeof this.handleResize === 'function') {
      window.removeEventListener('resize', this._handleResize);
    }
  }

  _handleResize() {
    if (!this._resizeTimer) {
      this.handleResize();

      // throttle the listener
      this._resizeTimer = setTimeout(() => {
        // if a resize came in while we paused, adjust again once after the pause before we start listening again
        if (this._pendingResize) {
          this.handleResize();
        }

        this._resizeTimer = false;
      }, this.throttleRate);
    } else {
      this._pendingResize = true;
    }
  }
}

export default ResizeCore;
