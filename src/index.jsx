import React from 'react';
import PropTypes from 'prop-types';

import useResize from './useResize';

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
  const allChildren = (typeof props.children === 'string') ? props.children : '';

  const sizerEl = React.useRef();
  const spreaderEl = React.useRef();
  const testChildrenEl = React.useRef();
  const handlingResize = React.useRef(true);
  const searchStart = React.useRef(0);
  const searchEnd = React.useRef(allChildren.length);

  const { className, throttleRate, overflowNode, onTruncationChange } = props;
  const tagNames = { main: setTag(props.tagName) };

  const [testChildren, setTestChildren] = React.useState('');
  const [children, setChildren] = React.useState(allChildren);  // TODO: do we really need render full on server any more???
  const [lastCalculatedWidth, setLastCalculatedWidth] = React.useState(-1);

  const testChildrenRange = (start, end) => {
    searchStart.current = start;
    searchEnd.current = end;

    setTestChildren(allChildren.substring(0, end));
  };

  const calculationComplete = () => {
    let newChildren = allChildren;

    // are we actually trimming?
    if (testChildren.length < allChildren.length) {
      newChildren = testChildren.split(' ').slice(0, -1).join(' ');
    }

    handlingResize.current = false;
    setChildren(newChildren);

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

  const checkHeight = () => {
    const contentHeight = testChildrenEl.current.offsetHeight;
    const halfWay = Math.round((searchEnd.current - searchStart.current) / 2);
    const targetHeight = sizerEl.current ? sizerEl.current.offsetHeight : undefined;
    const linear = searchEnd.current - searchStart.current < 6;

    // do we need to trim?
    if (contentHeight > targetHeight) {
      // chunk/ trim down
      if (linear) {
        testChildrenRange(testChildren.length, testChildren.length - 1);
      } else {
        testChildrenRange(searchStart.current, searchEnd.current - halfWay);
      }

    // we've used all the characters in a window expand situation
    } else if (testChildren.length === allChildren.length) {
      calculationComplete();
    } else if (linear) {
      // if we just got here by decrementing one, we're good
      if (searchStart.current > searchEnd.current) {
        calculationComplete();
      } else {
        // window grew, increment up one
        testChildrenRange(testChildren.length, testChildren.length + 1);
      }
    } else {
      // chunk up, still in binary search mode
      testChildrenRange(searchEnd.current, searchEnd.current + halfWay);
    }
  };

  const startCalculation = () => {
    searchStart.current = 0;
    searchEnd.current = allChildren.length;
    setLastCalculatedWidth(spreaderEl.current.offsetWidth);
    handlingResize.current = true;
    setTestChildren(allChildren);
  };

  const recalculate = () => {
    // this will kick of a sequence mimicing an initial calculation, this is necessary because if we're currently showing
    // all the children (no need to truncate) then the effect below to check height won't kick in which it needs too.
    setTestChildren('');
  };

  const handleResize = () => {
    if (!spreaderEl.current) { return; }

    if (spreaderEl.current.offsetWidth !== lastCalculatedWidth && !handlingResize.current) {
      recalculate();
    }
  };

  useResize(handleResize, throttleRate);

  React.useEffect(() => {
    if (testChildren === '' && sizerEl.current) {
      startCalculation();
    } else {
      checkHeight();
    }
  }, [testChildren, sizerEl.current]);

  React.useEffect(() => {
    // this will skip this effect on the first render
    if (testChildren !== '') {
      recalculate();
    }
  }, [props.lines]);

  const vertSpacers = [];
  for (let i = 0; i < props.lines; i++) {
    vertSpacers.push(<span style={block} key={i}>W</span>);
  }

  const maxHeight = (sizerEl.current ? sizerEl.current.offsetHeight : 0) + 'px';
  const overflow = (testChildren.length < allChildren.length) ? overflowNode : null;

  return (
    <tagNames.main className={className || ''} {...passProps(props)}>
      <span style={{ ...wrapperStyles, maxHeight }}>
        <span className="shiitake-children" style={childrenStyles}>{children}{overflow}</span>

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
  throttleRate: PropTypes.number,
  tagName: PropTypes.string,
  overflowNode: PropTypes.node,
  onTruncationChange: PropTypes.func,
};

Shiitake.defaultProps = {
  className: '',
  throttleRate: undefined,
  tagName: undefined,
  overflowNode: '\u2026',
  children: '',
  onTruncationChange: undefined,
};

export default React.memo(Shiitake);
