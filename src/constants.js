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
  position: 'relative',
  left: '-20000px',
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
