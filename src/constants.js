/**
 * @file style constants and static functions
 */

export const block = { display: 'block' };

export const sizerWrapperStyles = {
  ...block,
  position: 'absolute',
  left: '-20000px',
  width: '100%',
};

export const spreaderStyles = {
  ...block,
  height: '0px',
  width: '100%',
};

export const wrapperStyles = {
  ...block,
  position: 'relative',
  overflow: 'hidden',
};

export const childrenStyles = {
  ...block,
  width: '100%',
};

const tagWhitelist = [
  'div',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'span',
];

export function setTag(tagName) {
  if (!tagName) {
    return 'div';
  }

  const foundTag = tagWhitelist.find(tag => tagName === tag);
  return foundTag || 'div';
}

const eventWhitelist = [
  'onClick',
  'onContextMenu',
  'onDoubleClick',
  'onDrag onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
];

export function passProps(props) {
  return (Object.keys(props) || {}).reduce((passed, key) => {
    const hasEvent = eventWhitelist.find(event => event === key);
    const passedCopy = { ...passed };

    if (hasEvent) {
      passedCopy[key] = props[key];
    }

    return passedCopy;
  }, {});
}
