/* eslint-env browser */

import React from 'react';

const defaultThrottleRate = 200;

function debounce(fn, ms) {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn();
    }, ms);
  };
}

export default function useResize(handler, throttleRate = defaultThrottleRate) {
  React.useEffect(() => {
    const debouncedHandleResize = debounce(handler, throttleRate);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };

  });
}
