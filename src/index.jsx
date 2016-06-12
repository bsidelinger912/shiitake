/**
 * @class Shiitake
 * @description React line clamp that won't get you fired
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import ResizeCore from './ResizeCore';
import { getLines } from './functions';

const sizerWrapperStyles = {
  position: 'absolute',
  left: '-10000px',
  width: '150%',
};

const sizerStyles = {
  display: 'inline-block',
};

export default class extends ResizeCore {
  state = {
    lastCalculatedWidth: 0,
    children: '',
    lineWidthContent: 'W',
    fixHeight: false,
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.string.isRequired,
  }

  // this is the meat of the component, it adds the trimmed content to state and fills the sizer on resize events
  handleResize() {
    const wrapper = ReactDOM.findDOMNode(this.refs.wrapper);
    const availableWidth = wrapper.offsetWidth;

    // was there a width change?
    if (availableWidth !== this.state.lastCalculatedWidth) {
      const sizer = ReactDOM.findDOMNode(this.refs.sizer);
      const fixHeight = sizer.offsetHeight;
      const addingChildren = (this.state.lastCalculatedWidth < availableWidth);
      const keepGoing = (addingChildren) ? (sizer.offsetWidth < availableWidth) : (sizer.offsetWidth > availableWidth);

      // have we re-populated the sizer enough?
      if (keepGoing) {
        const lineWidthContentLength = this.state.lineWidthContent.length;
        const newTrimIndex = (addingChildren) ? lineWidthContentLength + 1 : lineWidthContentLength - 1;

        // have we used it all?
        if (newTrimIndex < this.props.children.length) {
          // nope, add/remove one and fix the height during the transition
          // if we haven't added any children, just give it all the props.children as we're fixing height anyway
          const children = (this.state.children.length > 0) ? this.state.children : this.props.children;

          this.setState({ fixHeight, children, lineWidthContent: this.props.children.substring(0, newTrimIndex) });

          setTimeout(() => { this.handleResize(); }, 0);
        } else {
          // just add it all
          this.setState({ children: this.props.children, lastCalculatedWidth: availableWidth, fixHeight });
        }
      } else {
        // we've just finished populating the sizer, so we can compute the string
        const children = getLines(this.props.children, this.state.lineWidthContent.length, this.props.lines).join(' ');
        this.setState({ children, lastCalculatedWidth: availableWidth, fixHeight });
      }
    }
  }

  render() {
    const { fixHeight } = this.state;

    const wrapperStyles = { position: 'relative' };
    if (fixHeight) {
      wrapperStyles.height = `${fixHeight}px`;
      wrapperStyles.overflow = 'hidden';
    }

    const vertSpacers = [];
    for (let i = 1; i < this.props.lines; i++) {
      vertSpacers.push(<div>W</div>);
    }

    return (
      <div className={this.props.className || ''}>
        <div ref="wrapper" style={wrapperStyles}>
          <div style={sizerWrapperStyles}>
            <div style={sizerStyles} ref="sizer">
              {this.state.lineWidthContent}
              {vertSpacers}
            </div>
          </div>

          {this.state.children}
        </div>
      </div>
    );
  }
}
