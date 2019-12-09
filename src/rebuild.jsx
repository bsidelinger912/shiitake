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

const Shiitake = (props) => {
  const sizerEl = React.useRef();
  const spreaderEl = React.useRef();
  const testChildrenEl = React.useRef();
  const handlingResize = React.useRef(true);

  const allChildren = (typeof props.children === 'string') ? props.children : '';
  const { renderFullOnServer, className, throttleRate, overflowNode, onTruncationChange } = props;
  const targetHeight = sizerEl.current ? sizerEl.current.offsetHeight : undefined;
  const tagNames = { main: setTag(props.tagName) };

  const [lastCalculatedWidth, setLastCalculatedWidth] = React.useState(-1);
  const [testChildren, setTestChildren] = React.useState('');
  const [children, setChildren] = React.useState((props.renderFullOnServer) ? allChildren : '');

  // functions
  const callDeffered = (func) => {
    if (spreaderEl.current) {
      func();
    }
  };

  const testChildrenRange = (start, end) => {
    const trimEnd = (end - start < 6 || lastCalculatedWidth > -1) ? end : end - Math.round((end - start) / 2);

    setTestChildren(allChildren.substring(0, trimEnd));
    callDeffered(checkHeight(start, end)); // eslint-disable-line no-use-before-define
  };

  const prepChildren = () => {
    let newChildren = allChildren;

    // are we actually trimming?
    if (testChildren.length < allChildren.length) {
      newChildren = testChildren.split(' ').slice(0, -1).join(' ');
    }

    handlingResize.current = false;
    setChildren(newChildren);
    setLastCalculatedWidth(spreaderEl.current.offsetWidth);

    // if we  changed the length of the visible string, check if we're switching from truncated to
    // not-truncated or vica versa
    if (newChildren.length !== children.length) {
      const wasTruncatedBefore = children.length !== allChildren.length;
      const isTruncatedNow = newChildren.length !== allChildren.length;

      if (wasTruncatedBefore !== isTruncatedNow && typeof onTruncationChange === 'function') {
        onTruncationChange(isTruncatedNow);
      }
    }
  };

  const checkHeight = (start, end) => {
    const contentHeight = testChildrenEl.current.offsetHeight;
    const halfWay = end - Math.round((end - start) / 2);

    // TODO: refine this flag, make simpler
    const linear = (end - start < 6
      || (end === testChildren.length && end !== allChildren.length)
      || lastCalculatedWidth > -1);

    // do we need to trim?
    if (contentHeight > targetHeight) {
      // chunk/ trim down
      if (linear) {
        testChildrenRange(testChildren.length, testChildren.length - 1);
      } else {
        testChildrenRange(start, halfWay);
      }

    // we've used all the characters in a window expand situation
    } else if (testChildren.length === allChildren.length) {
      prepChildren();
    } else if (linear) {
      // if we just got here by decrementing one, we're good
      if (start > end) {
        prepChildren();
      } else {
        // window grew, increment up one
        testChildrenRange(testChildren.length, testChildren.length + 1);
      }
    } else {
      // chunk up, still in binary search mode
      testChildrenRange(halfWay, end);
    }
  };

  const handleResize = () => {
    if (!spreaderEl.current) { return; }

    const availableWidth = spreaderEl.current.offsetWidth;

    // was there a width change, or lines change?
    if (availableWidth !== lastCalculatedWidth && !handlingResize.current) {
      handlingResize.current = true;

      if (availableWidth < lastCalculatedWidth) {
        // increment down one
        callDeffered(checkHeight(testChildren.length, testChildren.length - 1));

      // window got larger?
      } else {
        // increment up one
        callDeffered(checkHeight(testChildren.length, testChildren.length + 1));
      }
    }
  };

  // handle initial render or recalculate from scratch (in the case of changed lines or changed children)
  React.useEffect(() => {
    if (testChildren === '') {
      testChildrenRange(0, allChildren.length);
    }
  }, [testChildren]);


  // rendering stuff
  const vertSpacers = [];
  for (let i = 0; i < props.lines; i++) {
    vertSpacers.push(<span style={block} key={i}>W</span>);
  }

  const thisHeight = (targetHeight || 0) + 'px';
  const maxHeight = (renderFullOnServer) ? '' : thisHeight;

  const overflow = (testChildren.length < allChildren.length) ? overflowNode : null;

  return (
    <tagNames.main className={className || ''} {...passProps(props)}>
      <ResizeListener handleResize={handleResize} throttleRate={throttleRate} />

      <span style={{ ...wrapperStyles, maxHeight }}>
        <span className="shiitake-visible-children" style={childrenStyles}>{children}{overflow}</span>

        <span ref={spreaderEl} style={spreaderStyles} aria-hidden="true">{allChildren}</span>

        <span style={sizerWrapperStyles} aria-hidden="true">
          <span ref={sizerEl} style={block}>{vertSpacers}</span>
          <span className="shiitake-test-children" ref={testChildrenEl} style={block}>{testChildren}{overflow}</span>
        </span>
      </span>
    </tagNames.main>
  );
};

Shiitake.propTypes = {
  lines: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  renderFullOnServer: PropTypes.bool,
  throttleRate: PropTypes.number,
  tagName: PropTypes.string,
  overflowNode: PropTypes.node,
  onTruncationChange: PropTypes.func,
};

Shiitake.defaultProps = {
  className: '',
  renderFullOnServer: false,
  throttleRate: undefined,
  tagName: undefined,
  overflowNode: '\u2026',
  // in case someone accidentally passes something undefined in as children
  children: '',
  onTruncationChange: undefined,
};

export default React.memo(Shiitake);
